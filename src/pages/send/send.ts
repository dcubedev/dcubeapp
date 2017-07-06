import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { AccountService } from '../../providers/platform/stellar/account-service';

/*
  Author: Stephen Agyepong

    This component allows the user to send assets (currency, etc)
*/


@Component({
    templateUrl: 'send.html'
})
export class SendPage {
    showDestTag: boolean = true;

    accountBalances: CommonConstants.IAccountBalance[] = null;
    destInfo: CommonConstants.IDestinationInfo;
    paymentData: CommonConstants.IPaymentData;
    transactionContext: CommonConstants.ITransactionContext;

    constructor(public navCtrl: NavController,
        public menuCtrl: MenuController,
        private acctSvrc: AccountService) {
        this.init();
    }

    ngOnInit() {
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
        this.getAccountBalances();
    }

    init() {
        this.destInfo = {
            accountId: '',
            memo: null,
            memoType: null,
            isValidAddress: false,
            needFunding: false,
            acceptedCurrencies: ['XLM'],
            acceptedIOUs: []
        };

        this.paymentData = {
            destAddress: '',
            destTag: null,
            amount: 0,
            asset_code: 'XLM'
        };

        this.transactionContext = {
            isDirty: false,
            isValidCurrency: false,
            alternatives: [],
            choice: [],
            amount: 0
        };
    }

    onAccountEvent(self, acctevt: any) {
        //console.log("send::onAccountEvent() acctevt.memo: " + acctevt.memo);
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            self.account = self.acctSvrc.getAccount();
        }

        if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
            self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
        }
    }

    sendPayment() {
    }

    scanCode() {
    }

    donate() {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    getAccountBalances() {
        //console.log("SendPage::getAccountBalances() acctevt.memo: " + acctevt.memo);
        this.acctSvrc.getAccountBalances();
    }

}
