import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import * as AppConstants from '../../providers/app-constants/app-constants';
import { CommonService } from '../../providers/common-service/common-service';
import * as CommonConstants from '../../providers/common-service/common-service';
import { KeySettingsService } from '../../providers/platform/stellar/key-settings-service';
import { AccountService } from '../../providers/platform/stellar/account-service';
import { TrustService } from '../../providers/platform/stellar/trust-service';
import { TradingService } from '../../providers/platform/stellar/trading-service';

import { AccountAcctkeyFormPage } from '../account-acctkey-form/account-acctkey-form';


/*
  Author: Stephen Agyepong

    This component demonstrates the features and capabilities of the application
*/
@Component({
    templateUrl: 'demo.html'
})
export class DemoPage {
    account: CommonConstants.IAccount;
    accountBalances: CommonConstants.IAccountBalance[];
    keysStored: CommonConstants.IWalletKey;
    outArea: string = "";

    constructor(private navCtrl: NavController, private menuCtrl: MenuController,
        private commonSvrc: CommonService,
        private keySettingsService: KeySettingsService,
        private acctSvrc: AccountService,
        private trustSvrc: TrustService,
        private tradingSvrc: TradingService) {
        this.keysStored = {
            address: "",
            secret: "",
            mode: "undefined" //created, loaded
        };

        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
        //console.log("Entering DemoPage.constructor() ...");
    }

    ngOnInit() {
        this.commonSvrc.initAccount(this);
        //console.log("DemoPage.ngOnInit() this.account: " + this.account);
        //console.log("DemoPage.ngOnInit() this.commonSvrc.appCurr: " + this.commonSvrc.appCurr);
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
        //console.log("DemoPage.ngOnInit() this.keysStored: " + this.keysStored);
        //console.log("DemoPage.ngOnInit() this.keysStored.address: " + this.keysStored.address);
        this.getAccountBalances();
        this.commonSvrc.commonEvents$.subscribe(commonevt => this.onCommonEvent(commonevt));
    }

    onAccountEvent(self, acctevt: any) {
        //console.log("DemoPage.onAccountEvent() acctevt: " + acctevt);
        //console.log("DemoPage.onAccountEvent() acctevt.memo: " + acctevt.memo);
        //console.log("DemoPage.onAccountEvent() acctevt.status: " + JSON.stringify(acctevt.status));
        //console.log("DemoPage.onAccountEvent() self.acctSvrc.getAccount(): " + self.acctSvrc.getAccount());
        //console.log("Entering DemoPage.onAccountEvent() ... self.acctSvrc: " + self.acctSvrc);
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            //self.account = self.acctSvrc.getAccount();
            //console.log("DemoPage.onAccountEvent() self.account: " + self.account);
            //console.log("DemoPage.onAccountEvent() self.account.balance: " + self.account.balance);
        }

        if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
            self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
        }
    }

    onCommonEvent(acctevt) {
        //console.log("DemoPage.onCommonEvent() acctevt.memo: " + acctevt.memo);
        //console.log("DemoPage.onCommonEvent() acctevt.status: " + acctevt.status);
        //console.log("DemoPage.onCommonEvent() this.commonSvrc.appCurr: " + this.commonSvrc.appCurr);
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
        //console.log("DemoPage.onCommonEvent() this.account.asset_code: " + this.account.asset_code);
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    gotoAccountAcctkeyForm() {
        this.navCtrl.push(AccountAcctkeyFormPage);
    }

    genKeypair() {
        this.keysStored = this.keySettingsService.genKeypair();
    }

    saveKeypair() {
        this.keySettingsService.saveKeysStore(this.keysStored);
    }

    getPaymentInfo() {
        this.acctSvrc.getPaymentInfo(this.keysStored.address);
    }

    genKeyAndFundAccount() {
        this.keysStored = this.keySettingsService.genKeypair();
        //this.fundAccount();
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

    fundAccount() {
        console.log("this.commonSvrc.appMode: " + this.commonSvrc.appMode);
        if (CommonConstants.AppMode[CommonConstants.AppMode.PROD] === this.commonSvrc.appMode) {
            this.createAndFundAccountAny();
        } else {
            this.fundAccountWithFriendbot();
        }
    }

    createAndFundAccountAny() {
        this.acctSvrc.createAndFundAccountAny(this.keysStored.address, this.account.destaddress, this.keysStored.address, this.keysStored.secret, this.account.pymtamt);
    }

    fundAccountWithFriendbot() {
        this.acctSvrc.fundAccountWithFriendbot(this.keysStored.address);
    }

    fundAccountWithDcubeFriendbot() {
        //this.stellarAcctSvrc.fundAccountWithFriendbot(this.keysStored.address);
    }

    requestPayment() {
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
        let signerSeed = this.account.destsecret;
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

    sendFederationRequest() {
        this.tradingSvrc.sendFederationRequest(this.account.receiver_ename, this.account.req_type);
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
