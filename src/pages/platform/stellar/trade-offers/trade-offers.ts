import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import * as AppConstants from '../../../../providers/app-constants/app-constants';
import { CommonService } from '../../../../providers/common-service/common-service';
import * as CommonConstants from '../../../../providers/common-service/common-service';

import { KeySettingsService } from '../../../../providers/platform/stellar/key-settings-service';
import { AccountService } from '../../../../providers/platform/stellar/account-service';
import { TrustService } from '../../../../providers/platform/stellar/trust-service';
import { TradingService } from '../../../../providers/platform/stellar/trading-service';
import { CommonUtilsService } from '../../../../providers/platform/stellar/common-utils-service';

/*
  Author: Stephen Agyepong

    This component demonstrates the features and capabilities of the stellar offers and trades
*/
@Component({
    templateUrl: 'trade-offers.html'
})
export class OffersAndTradesPage {
    account: CommonConstants.IAccount;
    accountBalances: CommonConstants.IAccountBalance[];
    keysStored: CommonConstants.IWalletKey;
    transaction: CommonConstants.ITransaction;
    outArea: string = "";

    constructor(private navCtrl: NavController, private menuCtrl: MenuController,
        private commonSvrc: CommonService,
        private keySettingsService: KeySettingsService,
        private acctSvrc: AccountService,
        private trustSvrc: TrustService,
        private tradingSvrc: TradingService,
        private cusSvrc: CommonUtilsService) {
        this.keysStored = {
            address: "",
            secret: "",
            mode: "undefined" //created, loaded
        };

        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
        //console.log("Entering OffersAndTradesPage.constructor() ...");
    }

    ngOnInit() {
        let asset_code = 'USD';
        let amount = 1;
        let dest_amount = 5;
        let send_max_amount = 100;
        let dest_asset_type = 'credit_alphanum4';
        this.commonSvrc.initAccount(this);
        this.commonSvrc.initTransaction(this, asset_code, amount, dest_amount, send_max_amount, dest_asset_type);
        //console.log("OffersAndTradesPage.ngOnInit() this.account: " + this.account);
        //console.log("OffersAndTradesPage.ngOnInit() this.commonSvrc.appCurr: " + this.commonSvrc.appCurr);
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
        //console.log("OffersAndTradesPage.ngOnInit() this.keysStored: " + this.keysStored);
        //console.log("OffersAndTradesPage.ngOnInit() this.keysStored.address: " + this.keysStored.address);
        this.getAccountBalances();
        this.commonSvrc.commonEvents$.subscribe(commonevt => this.onCommonEvent(commonevt));
    }

    onAccountEvent(self, acctevt: any) {
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            //self.account = self.acctSvrc.getAccount();
            //console.log("OffersAndTradesPage.onAccountEvent() self.account: " + self.account);
            //console.log("OffersAndTradesPage.onAccountEvent() self.account.balance: " + self.account.balance);
        }

        if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
            self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
        }
    }

    onCommonEvent(acctevt) {
        //console.log("OffersAndTradesPage.onCommonEvent() acctevt.memo: " + acctevt.memo);
        //console.log("OffersAndTradesPage.onCommonEvent() acctevt.status: " + acctevt.status);
        //console.log("OffersAndTradesPage.onCommonEvent() this.commonSvrc.appCurr: " + this.commonSvrc.appCurr);
        if (CommonConstants.APPCURR === acctevt.memo && CommonConstants.APPCURR_CHANGED === acctevt.status) {
            this.account.asset_code = this.commonSvrc.appCurr;
        }
        if (CommonConstants.APPMODE === acctevt.memo && CommonConstants.APPMODE_CHANGED === acctevt.status) {
        }
        if (CommonConstants.APPLANG === acctevt.memo && CommonConstants.APPLANG_CHANGED === acctevt.status) {
        }
        if (CommonConstants.APPPLATFORM === acctevt.memo && CommonConstants.APPPLATFORM === acctevt.status) {
        }
        if (CommonConstants.PAYMETHOD === acctevt.memo && CommonConstants.PAYMETHOD === acctevt.status) {
        }
        //console.log("OffersAndTradesPage.onCommonEvent() this.account.asset_code: " + this.account.asset_code);
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    getPaymentInfo() {
        this.acctSvrc.getPaymentInfo(this.keysStored.address);
    }

    getAccountBalances() {
        let addr = this.keysStored.address;

        if (null !== addr && undefined !== addr && addr.length > 0) {
            // use supplied key
            this.acctSvrc.getAccountBalanceForKeyWithAddr(addr);
        } else {
            // use default wallet key
            this.acctSvrc.getAccountBalances();
        }
    }

    getAccountBalancesUseStellarBalances() {
        let self = this;
        console.log("getAccountBalances() this.keysStored.address: " + this.keysStored.address);
        if (null !== this.keysStored.address && "" !== this.keysStored.address) {
            this.acctSvrc.getAccountBalancesUseStellarBalances(this.keysStored.address).then(acctBalances => {
                console.log("getAccountBalances() acctBalances: " + JSON.stringify(acctBalances));
                self.accountBalances = <CommonConstants.IAccountBalance[]>acctBalances;
            }).catch(function (err) {
                console.log(err.stack || err);
            })
        }
    }

    createPassiveOffer() {
        let self = this;
        this.transaction.asset_code = this.account.asset_code;
        //this.transaction.selling_issuer;
        this.transaction.dest_asset_code = this.account.dest_asset_code;
        //this.transaction.buying_issuer;
        this.transaction.amount = this.account.pymtamt;
        this.transaction.price = { n: this.transaction.sell_units, d: this.transaction.buy_units };
        //this.transaction.sell_units = this.transaction.sell_units;
        //this.transaction.buy_units = this.transaction.buy_units;   
        //this.transaction.offerId = this.transaction.offerId;
        this.transaction.sender = this.keysStored.address;
        this.tradingSvrc.createPassiveOffer(this.transaction).then(data => {
            //console.log('OffersAndTradesPage::createPassiveOffer() data: ' + JSON.stringify(data));
            self.outArea = JSON.stringify(data);
        },
            onerr => {
                console.error('OffersAndTradesPage::createPassiveOffer() error: ' + JSON.stringify(onerr));
            });
    }

    manageOffers() {
        let self = this;
        this.transaction.asset_code = this.account.asset_code;
        //this.transaction.selling_issuer;
        this.transaction.dest_asset_code = this.account.dest_asset_code;
        //this.transaction.buying_issuer;
        this.transaction.amount = this.account.pymtamt;
        this.transaction.price = { n: this.transaction.sell_units, d: this.transaction.buy_units };
        //this.transaction.sell_units = this.transaction.sell_units;
        //this.transaction.buy_units = this.transaction.buy_units;   
        //this.transaction.offerId = this.transaction.offerId;
        this.transaction.sender = this.keysStored.address;
        this.transaction.sender_secret = this.keysStored.secret;
        
        this.tradingSvrc.manageOffers(this.transaction).then(data => {
            //console.log('OffersAndTradesPage::manageOffers() data: ' + JSON.stringify(data));
            self.outArea = JSON.stringify(data);
        },
        onerr => {
            console.error('OffersAndTradesPage::manageOffers() error: ' + JSON.stringify(onerr));
        });
    }

    offersForAccount() {
        let self = this;
        this.transaction.sender = this.keysStored.address;
       
        let account = this.transaction.sender;
        let cursor = this.transaction.cursor;
        let limit = this.transaction.limit;
        let sort_order = this.transaction.order;

        let cursor_r = '';
        if (undefined !== cursor) {
            cursor_r = '&cursor=' + cursor;
        }

        let limit_r = '';
        if (undefined !== limit) {
            limit_r = '&limit=' + limit;
        }

        let sort_order_r = 'order=asc';
        if (undefined !== sort_order) {
            sort_order_r = 'order=' + sort_order;
        }

        let reQuery = '/accounts/' + account + '/offers?' + sort_order_r + cursor_r + limit_r;
        console.log("OffersAndTradesPage::offersForAccount() sending GET reQuery: " + reQuery);

        this.cusSvrc.getHttpHorizon(reQuery).then(data => {
            //console.log('OffersAndTradesPage::offersForAccount() data: ' + JSON.stringify(data));
            self.outArea = JSON.stringify(data);
        },
        onerr => {
            console.error('OffersAndTradesPage::offersForAccount() error: ' + JSON.stringify(onerr));
        });
    }

    findPaymentPath() {
        let self = this;
        this.transaction.receiver = this.account.destaddress;
        this.transaction.sender = this.keysStored.address;
        this.transaction.dest_asset_type = this.account.dest_asset_type;
        this.transaction.dest_asset_code = this.account.dest_asset_code;

        let receiver = this.transaction.receiver;
        let source = this.transaction.sender;
        let dest_asset_type = this.transaction.dest_asset_type;
        let dest_asset_code = this.transaction.dest_asset_code;
        let dest_asset_issuer = this.transaction.buying_issuer;
        let dest_amount = this.transaction.dest_amount;

        let reQuery = '?destination_account=' + receiver
            + '&source=' + source
            + '&destination_asset_type=' + dest_asset_type
            + '&destination_asset_code=' + dest_asset_code
            + '&destination_asset_issuer=' + dest_asset_issuer
            + '&destination_amount=' + dest_amount;
        console.log('OffersAndTradesPage::findPaymentPath() reQuery: ' + reQuery);

        let opname = 'paths';

        this.cusSvrc.getHttpHorizon(reQuery, opname).then(data => {
            //console.log('OffersAndTradesPage::findPaymentPath() data: ' + JSON.stringify(data));
            self.outArea = JSON.stringify(data);
        },
        onerr => {
            console.error('OffersAndTradesPage::findPaymentPath() error: ' + JSON.stringify(onerr));
        });
    }

    makePaymentWithPath() {
        //let self = this;
        this.transaction.receiver = this.account.destaddress;
        this.transaction.sender = this.keysStored.address;
        this.transaction.dest_asset_type = this.account.dest_asset_type;
        this.transaction.dest_asset_code = this.account.dest_asset_code;
        //this.transaction.buying_issuer;
        //this.transaction.dest_amount;
        //this.transaction.send_max_amount;
        //this.transaction.buying_issuer;
        //this.transaction.path;

        
    }
    sendPayment() {
        // make payment
        let asset_code = this.account.asset_code;
        let pymtamt: string = "" + this.account.pymtamt;
        this.acctSvrc.makePayment(this.keysStored.address, this.keysStored.secret, this.account.destaddress, asset_code, pymtamt, this.account.memo);
    }

    makePaymentUsingBridge() {
        let asset_code = this.account.asset_code;
        let pymtamt: string = "" + this.account.pymtamt;
        this.acctSvrc.makePaymentUsingBridge(this.keysStored.address, this.keysStored.secret, this.account.destaddress, asset_code, pymtamt, this.account.memo, this.account.memo_type);
    }

    makePaymentUsingBridgeWithCompliance() {
        let asset_code = this.account.asset_code;
        let pymtamt: string = "" + this.account.pymtamt;
        this.acctSvrc.makePaymentUsingBridgeWithCompliance(this.keysStored.address, this.keysStored.secret, this.account.receiver_ename, this.account.sender_ename, asset_code, pymtamt, this.account.memo, this.account.memo_type, this.account.extra_memo);
    }

    changeTrustline() {
        let issuingAddr = this.keysStored.address;
        let signerSeed = this.keysStored.secret;
        let asset_code = this.account.asset_code;
        let trustLimitAmt: string = "" + this.account.trustLimitAmt;
        this.trustSvrc.changeTrust(issuingAddr, signerSeed, asset_code, trustLimitAmt);
    }

    checkTrustline() {
        let assetIssuer = this.keysStored.address;
        let assetCode = this.account.asset_code;
        let clientAccountId = this.account.destaddress;
        this.trustSvrc.checkTrust(assetCode, assetIssuer, clientAccountId);
    }

    changeTrustlineAndPay() {
        let issuingAddr = this.keysStored.address;
        let issuingSeed: string = this.keysStored.secret;
        let signerSeed: string = <string>this.account.destsecret;
        let asset_code = this.account.asset_code;
        let pymtamt: string = "" + this.account.pymtamt;
        let trustLimitAmt: string = "" + this.account.trustLimitAmt;
        this.trustSvrc.changeTrustAndPay(issuingAddr, issuingSeed, signerSeed, asset_code, trustLimitAmt, pymtamt);
    }

    getOrderBookTrades() {
        this.tradingSvrc.getOrderBookTrades();
    }

    getBuySellTradeInfo() {
        let sellCurr = CommonConstants.AppCurrency[CommonConstants.AppCurrency.XLM];
        let buyCurr = CommonConstants.AppCurrency[CommonConstants.AppCurrency.USD];
        this.tradingSvrc.orderBookInfo(this.keysStored.address, sellCurr, this.account.destaddress, buyCurr);
    }

}