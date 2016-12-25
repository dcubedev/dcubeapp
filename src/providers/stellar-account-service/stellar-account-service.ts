import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { RequestMethod } from '@angular/http';
import { EventEmitter } from '@angular/core';

import * as AppConstants from '../app-constants/app-constants';
import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';
import { StellarKeySettingsService } from '../stellar-key-settings-service/stellar-key-settings-service';
import * as StellarKeySettingsConstants from '../stellar-key-settings-service/stellar-key-settings-service';
import { StellarRemoteService } from '../stellar-remote-service/stellar-remote-service';

import * as StellarConstants from "../stellar-constants/stellar-constants";
import { StellarCommonService } from "../stellar-common-service/stellar-common-service";

declare var StellarSdk: any;

/*
  Generated class for the StellarAccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarAccountService {
    public acctEvent$: EventEmitter<any>;

    account: CommonConstants.IAccount;
    destinationInfo: CommonConstants.IDestinationInfo;

    keysChanged = false;
    connectionChanged = false;
    paymentsEventSource;
    pagingToken = 0;

    constructor(private http: Http, private comSrvc: CommonService,
        private keysettings: StellarKeySettingsService,
        private srsSrvc: StellarRemoteService,
        private scsSrvc: StellarCommonService) {
        this.acctEvent$ = new EventEmitter();

        this.resetAccount("");
    }

    getAccountAddress() {
        return this.account.address;
    }

    resetAccount(acctaddr) {
        this.account = {
            address: acctaddr,
            balance: 0,
            reserve: 0,
            sequence: 0,
            transactions: [],
            otherCurrencies: [],
            pymtamt: 0
        }
        this.destinationInfo = {
            accountId: acctaddr,
            memo: '',
            memoType: '',
            isValidAddress: false,
            needFunding: true,
            acceptedCurrencies: [],
            acceptedIOUs: []
        };
    }

    healthCheck() {
        console.log('SAS healthCheck: this.srsSrvc.isConnected(): ' + this.srsSrvc.isConnected());
        if (!this.srsSrvc.isConnected()) {
            this.srsSrvc.initServer();
            this.connectionChanged = true;
        }

        if (this.srsSrvc.isConnected()) {
            // Now get account balances
            this.attachToKeys();
            this.keysChanged = false;
            this.connectionChanged = false;
        }
    }

    setInflationDestination() {
        if (this.account.balance < this.account.reserve + StellarConstants.inflationDestBalanceBuffer)
            return;

        let operation = StellarSdk.Operation.setOptions({
            inflationDest: StellarKeySettingsConstants.INFLATION_DESTINATION,
            homeDomain: StellarConstants.HOME_DOMAIN
        });
        let transaction = this.buildTransaction(operation, null, true);
        this.srsSrvc.getServer().submitTransaction(transaction)
            .then((transactionResult) => {
                console.log(transactionResult);
                var sdkAcc = new StellarSdk.Account(this.account.address, this.account.sequence);
                sdkAcc.incrementSequenceNumber();
                this.account.sequence = sdkAcc.sequenceNumber();
            })
            .catch(console.log('setInflationDestination error'));
    }

    getAccountBalances() {
        this.getAccountBalanceForKey();
    }

    getAccountBalancesCallback() {
        let balances: CommonConstants.IAccountBalance[] = [];
        let balance: CommonConstants.IAccountBalance = {
            asset_code: CommonConstants.AppCurrency[CommonConstants.AppCurrency.XLM],
            balance: this.account.balance
        };
        balances.push(balance);

        for (let index = 0; index < this.account.otherCurrencies.length; ++index) {
            let entry = this.account.otherCurrencies[index];
            balance = {
                asset_code: entry.currency,
                balance: entry.amount
            };
            balances.push(balance);
        }

        return balances;
    }

    getAccountBalancesUseStellarBalances(addr_p) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
            self.srsSrvc.getServer().accounts()
                .accountId(self.account.address)
                .call()
                .then((acc) => {
                    let balances: CommonConstants.IAccountBalance[] = [];
                    for (let i = 0; i < acc.balances.length; i++) {
                        let bal = acc.balances[i];
                        let assetCode = null;
                        let curr = bal.asset_code;

                        if (self.scsSrvc.isAssetNative(curr)) {
                            assetCode = CommonConstants.AppCurrency[CommonConstants.AppCurrency.XLM];
                        } else {
                            assetCode = curr;
                        }

                        let amount: number = parseFloat(bal.balance);
                        let balance: CommonConstants.IAccountBalance = {
                            asset_code: assetCode,
                            balance: amount
                        };
                        balances.push(balance);
                    }
                    resolve(balances);
                })
                .catch(StellarSdk.NotFoundError, function (err) {
                    console.log("getAccountBalances account not found: " + self.account.address);
                    reject(err);
                })
                .catch(function (err) {
                    console.log("getAccountBalances error for: " + self.account.address);
                    console.log(err.stack || err);
                    reject(err);
                })
        });
        return promise;
    }

    getKeyAddress() {
        let keyaddr = null;
        if (undefined !== this.account && null !== this.account && undefined !== this.account.address && null !== this.account.address) {
            if (this.account.address.length > 0) {
                keyaddr = this.account.address;
            } else {
                keyaddr = this.keysettings.loadKeysStore().address;
            }
        } else {
            keyaddr = this.keysettings.loadKeysStore().address;
        }

        return keyaddr;
    }

    getAccountBalanceForKey() {
        // get initial account balances
        let self = this;
        let keyaddr = this.getKeyAddress();

        self.resetAccount(keyaddr);

        if (undefined !== self.account.address && self.account.address.length > 0) {
            self.srsSrvc.getServer().accounts()
                .accountId(self.account.address)
                .call()
                .then(function (acc) {
                    let reserveChunks = 1 + acc.signers.length; // minimum reserve
                    for (let i = 0; i < acc.balances.length; i++) {
                        let bal = acc.balances[i];
                        if (bal.asset_code)
                            reserveChunks++;
                    }
                    self.account.sequence = acc.sequence;
                    if (acc.offers && acc.offers.length) {
                        for (let i = 0; i < acc.offers.length; i++) {
                            let offer = acc.offers[i];
                            if (offer)
                                reserveChunks++;
                        }
                    }
                    self.account.reserve = reserveChunks * StellarConstants.reserveChunkCost;
                })
                .catch(StellarSdk.NotFoundError, function (err) {
                    console.log("attachToKeys account not found");
                })
                .catch(function (err) {
                    console.log("attachToKeys() err: " + (err.stack || err));
                })

            self.srsSrvc.getServer().effects()
                .forAccount(self.account.address)
                .limit(StellarConstants.accountEffectLimit)
                .order('desc')
                .call()
                .then(function (effectResults) {
                    //console.log("getAccountBalanceForKey() effectResponse: " + JSON.stringify(effectResults));
                    let length = effectResults.records ? effectResults.records.length : 0;
                    for (let index = length - 1; index >= 0; index--) {
                        let currentEffect = effectResults.records[index];
                        self.applyToBalance(currentEffect);
                    }

                    self.acctEvent$.emit({
                        memo: AppConstants.ACCT_INFO_LOADED,
                        status: self.getAccountBalancesCallback()
                    });
                })
                .catch(function (err) {
                    //self.attachToPaymentsStream('now');
                    console.log("getAccountBalanceForKey err: " + err)
                });
        }
    }

    attachToKeys() {
        // get initial account balances
        let self = this;
        let keyaddr = this.getKeyAddress();
        this.resetAccount(keyaddr);
        self.srsSrvc.getServer().accounts()
            .accountId(self.account.address)
            .call()
            .then(function (acc) {
                //console.log("acctResponse: " + JSON.stringify(acc));
                let reserveChunks = 1 + acc.signers.length; // minimum reserve
                for (let i = 0; i < acc.balances.length; i++) {
                    let bal = acc.balances[i];
                    let amount: number = parseFloat(bal.balance);
                    if (bal.asset_code)
                        reserveChunks++;
                    self.addToBalance(bal.asset_code, amount);
                }
                self.account.sequence = acc.sequence;
                if (acc.offers && acc.offers.length) {
                    for (let i = 0; i < acc.offers.length; i++) {
                        let offer = acc.offers[i];
                        if (offer)
                            reserveChunks++;
                    }
                }
                self.account.reserve = reserveChunks * StellarConstants.reserveChunkCost;
            })
            .catch(StellarSdk.NotFoundError, function (err) {
                console.log("attachToKeys account not found");
            })
            .catch(function (err) {
                console.log("attachToKeys() err: " + (err.stack || err));
            })

        self.srsSrvc.getServer().effects()
            .forAccount(self.account.address)
            .limit(StellarConstants.accountEffectLimit)
            .order('desc')
            .call()
            .then(function (effectResults) {
                //console.log("effectResponse: " + JSON.stringify(effectResults));
                let length = effectResults.records ? effectResults.records.length : 0;
                for (let index = length - 1; index >= 0; index--) {
                    let currentEffect = effectResults.records[index];
                    self.effectHandler(currentEffect, false);
                }

                self.acctEvent$.emit({
                    memo: AppConstants.MEMO_ACCT,
                    status: AppConstants.ACCT_INFO_LOADED
                });

                let startListeningFrom;
                if (length > 0) {
                    let latestPayment = effectResults.records[0];
                    startListeningFrom = latestPayment.paging_token;
                }
                self.attachToPaymentsStream(startListeningFrom);
            })
            .catch(function (err) {
                self.attachToPaymentsStream('now');
                console.log("attachToKeys err: " + err)
            });
    }

    addToBalance(curr, amount: number) {
        if (this.scsSrvc.isAssetNative(curr)) {
            this.account.balance += amount;
            return;
        }
        for (let index = 0; index < this.account.otherCurrencies.length; ++index) {
            let entry = this.account.otherCurrencies[index];
            if (entry.currency == curr) {
                entry.amount += amount;
                return;
            }
        }
        // no entry for currency exists -> add new entry
        this.account.otherCurrencies.push({ currency: curr, amount: amount });
    }

    applyToBalance(effect) {
        if (effect.type === AppConstants.ACCT_CREATED)
            this.addToBalance(effect.asset_code, parseFloat(effect.starting_balance));
        else if (effect.type === AppConstants.ACCT_DEBITED)
            this.addToBalance(effect.asset_code, -parseFloat(effect.amount));
        else if (effect.type === AppConstants.ACCT_CREDITED)
            this.addToBalance(effect.asset_code, parseFloat(effect.amount));
    }

    buildTransaction(operation: any, memo: any, bSign: any) {
        let acc = new StellarSdk.Account(this.account.address, this.account.sequence);
        let builder = new StellarSdk.TransactionBuilder(acc);
        builder = builder.addOperation(operation);
        if (memo)
            builder = builder.addMemo(memo);
        let transaction = builder.build();
        if (bSign === true)
            transaction.sign({
                address: this.keysettings.keysStored.address,
                secret: this.keysettings.keysStored.secret
            });
        return transaction;
    }

    insertTransaction(trx, op, effect, fromStream) {
        let asset_code = effect.asset_code;
        if (asset_code === null || !asset_code)
            asset_code = StellarConstants.NATIVE_CURRENCY_XLM;

        let date = new Date(trx.created_at)
        let displayEffect = {
            effectId: effect.paging_token,
            asset_code: asset_code,
            asset_type: effect.asset_type,
            amount: effect.amount,
            debit: effect.type === AppConstants.ACCT_DEBITED,
            sender: op.from,
            receiver: op.to,
            memo: trx.memo,
            memoType: trx.memo_type,
            creationDate: date,
            creationTimestamp: date.getTime()
        }

        if (op.type === AppConstants.CREATE_ACCT) {
            displayEffect.amount = op.starting_balance;
            displayEffect.sender = op.funder;
            displayEffect.receiver = op.account;
        }

        if (fromStream && this.account.address === trx.source_account)
            this.account.sequence = trx.source_account_sequence;

        // insert at correct position
        let i;
        for (i = 0; i < this.account.transactions.length; i++) {
            var compareEffect = this.account.transactions[i];
            if (displayEffect.effectId === compareEffect.effectId)
                throw 'transaction already seen: ' + displayEffect.effectId;
            if (displayEffect.creationTimestamp > compareEffect.creationTimestamp) {
                break;
            }
        }
        this.account.transactions.splice(i, 0, displayEffect);

        return displayEffect;
    }

    insertEffect(effect, fromStream) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
            try {
                effect.operation()
                    .then(function (op) {
                        op.transaction()
                            .then(function (trx) {
                                try {
                                    let displayEffect = self.insertTransaction(trx, op, effect, fromStream);
                                    resolve(displayEffect);
                                }
                                catch (err) {
                                    reject(err);
                                }
                            });
                    })
            }
            catch (err) {
                reject(err);
            }
        });
        return promise;
    }

    effectHandler(effect, fromStream) {
        //console.log("effectHandler() effect : " + JSON.stringify(effect));
        let isRelevant = effect.type === AppConstants.ACCT_CREATED
            || effect.type === AppConstants.ACCT_DEBITED
            || effect.type === AppConstants.ACCT_CREDITED;

        if (isRelevant) {
            let self = this;
            this.insertEffect(effect, fromStream)
                .then((displayEffect) => {
                    if (fromStream) {
                        self.applyToBalance(effect);
                        self.acctEvent$.emit({
                            memo: 'account',
                            status: AppConstants.ACCT_INFO_LOADED
                        });
                    }
                    else {
                        self.acctEvent$.emit({
                            memo: 'account',
                            status: AppConstants.NEW_TRANSACT
                        });
                    }
                });
        }
    }

    attachToPaymentsStream(opt_startFrom) {
        let self = this;
        let futurePayments = this.srsSrvc.getServer().effects()
            .forAccount(self.account.address);
        if (opt_startFrom) {
            futurePayments = futurePayments.cursor(opt_startFrom);
        }
        if (this.paymentsEventSource) {
            console.log('close open effects stream')
            this.paymentsEventSource.close();
        }
        console.log('open effects stream with cursor: ' + opt_startFrom);
        this.paymentsEventSource = futurePayments.stream({
            onmessage: function (effect) { self.effectHandler(effect, true); }
        });
    }

    onKeysAvailable() {
        if (this.srsSrvc.isConnected())
            this.attachToKeys();
        else
            this.keysChanged = true;
    }

    createAndFundAccountAny(srckey, destkey, src_acct, secret, pymtamt) {
        let self = this;
        // create an Account object using locally tracked sequence number
        let seq = 0;
        let an_account = new StellarSdk.Account(srckey, seq);
        let transaction = new StellarSdk.TransactionBuilder(an_account)
            .addOperation(StellarSdk.Operation.createAccount({
                destination: destkey,
                startingBalance: pymtamt,
                source: src_acct
            }))
            .build();

        // sign the transaction
        transaction.sign(StellarSdk.Keypair.fromSeed(secret));

        // transaction is now ready to be sent to the network or saved somewhere
        // Ok, send it off to Stellar!
        self.srsSrvc.getServer().submitTransaction(transaction)
            .then(data => {
                console.log("createAndFundAccountAny() data: " + data);
            }, err => {
                console.log("createAndFundAccountAny() err: " + err);
            })
    }

    // Remote.getServer().friendbot(keys.address).call();
    fundAccountWithFriendbot(addrp) {
        let server = this.srsSrvc.getServer();
        server.friendbot(addrp)
            .call()
            .then(data => {
                console.log("fundAccountWithFriendbot() data: " + data);
            }, err => {
                console.log("fundAccountWithFriendbot() err: " + err);
            })
    }

    fundAccountWithDcubeFriendbot(addrp) {
        let url_p = StellarConstants.URL_FRIENDBOT + '?json=true&addr=' + addrp;

        this.comSrvc.getHttp(url_p).then(data => {
            console.log("fundAccountWithFriendbot() data: " + data);
        }, err => {
            console.log("fundAccountWithFriendbot() err: " + err);
        })
    }

    makePaymentUsingBridgeWithHttp(contentType, _body) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
            let _url = self.srsSrvc.getBridgeServerURL();
            let headers = new Headers();
            headers.append('Content-Type', contentType);
            //headers.append('Content-Type', 'application/text');
            //headers.append('Content-Type', 'application/json');
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');
            //headers.append('Origin', 'http://localhost:8001');
            var reqOptions: RequestOptionsArgs = {
                url: null,
                method: RequestMethod.Post,
                search: null,
                headers: headers,
                body: null
            };

            console.log("makePaymentUsingBridgeWithHttp() sending POST _url: " + _url);
            console.log("makePaymentUsingBridgeWithHttp() sending POST _body: " + _body);
            self.comSrvc.postHttp(_url, _body, reqOptions).then(data => {
                console.log("makePaymentUsingBridgeWithHttp() data: " + JSON.stringify(data));
                resolve(data);
            }, err => {
                console.log("makePaymentUsingBridgeWithHttp() err: " + JSON.stringify(err));
                reject(err);
            })
        });
        return promise;
    }

    makePaymentUsingBridgeWithCompliance(asset_issuer, asset_issuer_seed, receiver_ename, sender_ename, asset_code, amount, memo, memo_type_p, extra_memo) {
        let self = this;
        let contentType = 'application/x-www-form-urlencoded';

        let add_memo = "";
        if (undefined !== memo && null !== memo && undefined !== memo_type_p && null !== memo_type_p) {
            let memo_type = "&memo_type=" + memo_type_p;
            add_memo = "&memo=" + memo + memo_type;
        }

        // `extra_memo` is required for compliance (use it instead of `memo`)
        let body_urlenc = "amount=" + amount +
            "&asset_code=" + asset_code +
            "&asset_issuer=" + asset_issuer +
            "&destination=" + receiver_ename +
            "&source=" + asset_issuer_seed +
            "&sender=" + sender_ename +
            "&extra_memo=" + extra_memo;

        this.makePaymentUsingBridgeWithHttp(contentType, body_urlenc).then(data => {
            console.log("makePaymentWithCompliance() data: " + JSON.stringify(data));
            self.acctEvent$.emit({
                memo: AppConstants.NEW_PAYMENT,
                status: body_urlenc
            });
        }, err => {
            console.log("makePaymentWithCompliance() err: " + JSON.stringify(err));
        })

    }

    makePaymentUsingBridge(asset_issuer, issuer_seed, asset_receiver, asset_code, amount, memo, memo_type_p) {
        let self = this;
        let contentType = 'application/x-www-form-urlencoded';
        let add_memo = "";

        if (undefined !== memo && null !== memo && undefined !== memo_type_p && null !== memo_type_p) {
            let memo_type = "&memo_type=" + memo_type_p;
            add_memo = "&memo=" + memo + memo_type;
        }

        let body_urlenc = "amount=" + amount +
            "&asset_code=" + asset_code +
            "&asset_issuer=" + asset_issuer +
            "&destination=" + asset_receiver +
            "&source=" + issuer_seed +
            add_memo;

        this.makePaymentUsingBridgeWithHttp(contentType, body_urlenc).then(data => {
            console.log("makePaymentUsingBridge() response data: " + JSON.stringify(data));
            self.acctEvent$.emit({
                memo: AppConstants.NEW_PAYMENT,
                status: body_urlenc
            });
        }, err => {
            console.log("makePaymentUsingBridge() err: " + JSON.stringify(err));
        })

    }

    makePayment(srcAddrKey, srcSeedkey, destkey, asset_code, amount: string, memo: string) {
        let server = this.srsSrvc.getServer();
        let sourceKeys = StellarSdk.Keypair.fromSeed(srcSeedkey);

        let self = this;
        // First, check to make sure that the destination account exists.
        // You could skip this, but if the account does not exist, you will be charged
        // the transaction fee when the transaction fails.
        let asset = this.scsSrvc.getAssetObject(asset_code, srcAddrKey);

        server.loadAccount(destkey)
            // If the account is not found, surface a nicer error message for logging.
            .catch(StellarSdk.NotFoundError, function (error) {
                throw new Error('makePayment() The destination account does not exist!');
            })
            // If there was no error, load up-to-date information on your account.
            .then(function () {
                return server.loadAccount(sourceKeys.accountId());
            })
            .then(function (sourceAccount) {
                // Start building the transaction.
                var transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.payment({
                        destination: destkey,
                        // Because Stellar allows transaction in many currencies, you must
                        // specify the asset type. The special "native" asset represents Lumens:
                        // StellarSdk.Asset.native()
                        asset: asset,
                        amount: amount
                    }))
                    // A memo allows you to add your own metadata to a transaction. It's
                    // optional and does not affect how Stellar treats the transaction.
                    .addMemo(StellarSdk.Memo.text(memo))
                    .build();
                // Sign the transaction to prove you are actually the person sending it.
                transaction.sign(sourceKeys);
                // And finally, send it off to Stellar!
                return server.submitTransaction(transaction);
            })
            .then(function (result) {
                console.log('makePayment() Success! Results:', result);
                self.acctEvent$.emit({
                    memo: amount,
                    status: AppConstants.NEW_PAYMENT
                });
            })
            .catch(function (error) {
                console.error('makePayment() Something went wrong!', error);
            });
    }

    getPaymentInfo(accountId) {
        //var StellarSdk = require('stellar-sdk');
        //let server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        //var accountId = 'GC2BKLYOOYPDEFJKLKY6FNNRQMGFLVHJKQRGNSSRRGSMPGF32LHCQVGF';
        let self = this;
        let server = this.srsSrvc.getServer();

        // Create an API call to query payments involving the account.
        let payments = server.payments().forAccount(accountId);

        // If some payments have already been handled, start the results from the
        // last seen payment. (See below in `handlePayment` where it gets saved.)
        let lastToken = this.loadLastPagingToken();
        console.log("receivePayment lastToken: " + lastToken);
        if (lastToken) {
            payments.cursor(lastToken);
        }

        // `stream` will send each recorded payment, one by one, then keep the
        // connection open and continue to send you new payments as they occur.
        payments.stream({
            onmessage: function (payment) {
                // Record the paging token so we can start from here next time.
                self.savePagingToken(payment.paging_token);

                // The payments stream includes both sent and received payments. We only
                // want to process received payments here.
                if (payment.to !== accountId) {
                    return;
                }

                // In Stellar’s API, Lumens are referred to as the “native” type. Other
                // asset types have more detailed information.
                var asset;
                if (this.isAssetNative(payment.asset_code)) {
                    asset = 'lumens';
                }
                else {
                    asset = payment.asset_code + ':' + payment.asset_issuer;
                }

                console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
            },

            onerror: function (error) {
                console.error('Error in payment stream: ' + JSON.stringify(error));
            }
        });
    }

    savePagingToken(token) {
        // In most cases, you should save this to a local database or file so that
        // you can load it next time you stream new payments.
        console.log("savePagingToken token: " + token);
        this.pagingToken = token;
    }

    loadLastPagingToken() {
        // Get the last paging token from a local database or file
        console.log("loadLastPagingToken called");
        return this.pagingToken;
    }

    loadAccount(addr_p) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
            let server = self.srsSrvc.getServer();
            // returns {"_accountId":"","sequence":""}
            server.loadAccount(addr_p).then((account) => {
                console.log('Balances for account: ' + addr_p);
                console.log('Account info: ' + JSON.stringify(account));
                resolve(account);
            });
        });
        return promise;

    }

}

