import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CommonConstants from '../common-service/common-service';
import { StellarAccountService } from '../../providers/stellar-account-service/stellar-account-service';


/*
  Generated class for the AccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AccountService{
    account: CommonConstants.IAccount;

    constructor(private http: Http, private sas: StellarAccountService) {
        //this.healthCheck();
        //setInterval(this.healthCheck(), 3000);
        //console.log("Entering AccountService.constructor() ... 1");
    }

    onAccountEvent(callbackObj, acctevtFunc) {
        //console.log("AccountService.onAccountEvent() acctevtFunc: " + acctevtFunc);
        this.sas.acctEvent$.subscribe(acctevt => {
            //console.log("AccountService.onAccountEvent(subscribed) acctevt: " + acctevt);
            acctevtFunc(callbackObj, acctevt);
        });
    }

    buildTransaction(operation: any, memo: any, bSign: any) {
        this.sas.buildTransaction(operation, memo, bSign);
    }

    healthCheck() {
        this.sas.healthCheck();
        //console.log("AccountService.healthCheck() this.sas.account: " + this.sas.account);
        this.account = this.sas.account;
        //console.log("AccountService.healthCheck() this.account: " + this.account);
    }

    getAccount() {
        return this.account;
    }

    getPaymentInfo(accountId) {
        this.sas.getPaymentInfo(accountId);
    }

    getAccountBalances() {
        return this.sas.getAccountBalances();
    }

    getAccountBalancesUseStellarBalances(addr_p) {
        let self = this;
        let promise = new Promise(function (resolve, reject) {
            self.sas.getAccountBalancesUseStellarBalances(addr_p).then(acctBalances => {
                resolve(acctBalances);
            }).catch(function (err) {
                console.log(err.stack || err);
                reject(err);
            })
        });
        return promise;
    }

    makePayment(srcAddrKey, srcSeedkey, destkey, asset_type, amount: string, memo: string) {
        this.sas.makePayment(srcAddrKey, srcSeedkey, destkey, asset_type, amount, memo);
    }

    makePaymentUsingBridge(asset_issuer, issuer_seed, asset_receiver, asset_code, amount, memo, memo_type) {
        this.sas.makePaymentUsingBridge(asset_issuer, issuer_seed, asset_receiver, asset_code, amount, memo, memo_type);
    }

    makePaymentUsingBridgeWithCompliance(asset_issuer, asset_issuer_seed, receiver_ename, sender_ename, asset_code, amount, memo, memo_type_p, extra_memo) {
        this.sas.makePaymentUsingBridgeWithCompliance(asset_issuer, asset_issuer_seed, receiver_ename, sender_ename, asset_code, amount, memo, memo_type_p, extra_memo);
    }

    createAndFundAccountAny(srckey, destkey, src_acct, secret, pymtamt) {
        this.sas.createAndFundAccountAny(srckey, destkey, src_acct, secret, pymtamt);
    }

    fundAccountWithFriendbot(addrp) {
        this.sas.fundAccountWithFriendbot(addrp);
    }

}

