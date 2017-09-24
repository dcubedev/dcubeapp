import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';

import { KeySettingsService } from '../../providers/platform/stellar/key-settings-service';
import { AccountService } from '../../providers/platform/stellar/account-service';

/*
 * Author: Stephen Agyepong
 */
@Component({
    selector: 'tacctbals',
    templateUrl: 'tacctbalances.html'
})
export class TacctBalances {
    account: CommonConstants.IAccount;
    accountBalances: CommonConstants.IAccountBalance[] = null;
    keysStored: CommonConstants.IWalletKey;

    constructor(private navCtrl: NavController,
        public menuCtrl: MenuController,
        private acctSvrc: AccountService,
        private keySvrc: KeySettingsService,
        private commonSvrc: CommonService) {
    }

    ngOnInit() {
        this.keySvrc.onKeyEvent(this, this.onKeyEvent);

        this.getAccountBalances();
        this.commonSvrc.initAccount(this);
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
    }

    onKeyEvent(self, acctevt: any) {
        self.keysStored = acctevt.status;

        // if we have a valid key address and account balance is not set
        if (undefined !== self.keysStored && null !== self.keysStored && undefined !== self.keysStored.address && null !== self.keysStored.address && self.keysStored.address.length > 0
            && ((null !== self.accountBalances && self.accountBalances.length < 1) ||
                (null === self.accountBalances))) {
            self.getAccountBalances();
        }
    }

    onAccountEvent(self, acctevt: any) {
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            self.account = self.acctSvrc.getAccount();
        }

        if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
            self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
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

    getAccountBalances() {
        this.acctSvrc.getAccountBalances();
    }

}
