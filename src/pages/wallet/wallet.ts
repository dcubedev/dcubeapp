import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';
import { KeySettingsService } from '../../providers/key-settings-service/key-settings-service';
import { AccountService } from '../../providers/account-service/account-service';

/*
  Author: Stephen Agyepong

    This component displays information about the given wallet
*/


@Component({
    templateUrl: 'wallet.html'
})
export class WalletPage {
    account: CommonConstants.IAccount;
    accountBalances: CommonConstants.IAccountBalance[] = [];
    keysStored: CommonConstants.IWalletKey;

    constructor(private navCtrl: NavController,
        private menuCtrl: MenuController,
        private acctSvrc: AccountService,
        private keySvrc: KeySettingsService,
        private commonSvrc: CommonService) {
        //console.log("Entering WalletPage.constructor() ...");
    }

    ngOnInit() {
        //console.log("Entering WalletPage.ngOnInit() ...");
        this.keysStored = this.keySvrc.loadKeysStore();

        this.getAccountBalances();
        this.commonSvrc.initAccount(this);
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
    }

    onAccountEvent(self, acctevt: any) {
        //console.log("WalletPage.onAccountEvent() acctevt: " + acctevt);
        //console.log("WalletPage.onAccountEvent() acctevt.memo: " + acctevt.memo);
        //console.log("WalletPage.onAccountEvent() acctevt.status: " + <CommonConstants.IAccountBalance[]>acctevt.status);
        //console.log("Entering WalletPage.onAccountEvent() ... self.acctSvrc: " + self.acctSvrc);
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            self.account = self.acctSvrc.getAccount();
            //console.log("WalletPage.onAccountEvent() self.account: " + self.account);
            //console.log("WalletPage.onAccountEvent() self.account.balance: " + self.account.balance);
        }

        if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
            self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
        }
    }

    getAccountBalances() {
        this.acctSvrc.getAccountBalances();
        //console.log("getAccountBalances() this.accountBalances: " + this.accountBalances);
        //console.log("getAccountBalances() acctBalances: " + JSON.stringify(this.acctSvrc.getAccountBalances()));
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

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

}
