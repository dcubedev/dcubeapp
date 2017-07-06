import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { CommonService } from '../../providers/common-service/common-service';
import * as CommonConstants from '../../providers/common-service/common-service';

import { AccountService } from '../../providers/platform/stellar/account-service';

/*
  Author: Stephen Agyepong

    This component displays all transactions for the given wallet
*/

@Component({
    templateUrl: 'transactions.html'
})
export class TransactionsPage {
    account: CommonConstants.IAccount;
    transItem: CommonConstants.ITransaction;

    constructor(private navCtrl: NavController, public menuCtrl: MenuController,
        private commonSvrc: CommonService,
        private acctSvrc: AccountService) {
        //console.log("Entering TransactionsPage.constructor() ... T1");
        commonSvrc.initAccountTransactions(this, this.resetTransaction());
    }

    ngOnInit() {
        //console.log("\n\nEntering TransactionsPage.ngOnInit() ... T3");
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
    }

    ionViewDidEnter() {
        //console.log("\n\nEntering TransactionsPage.ionViewDidEnter() ... T4");
        this.acctSvrc.healthCheck();
    }

    onAccountEvent(self, acctevt) {
        //console.log("Entering TransactionsPage.onAccountEvent() ... self.acctSvrc: " + self.acctSvrc);
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            self.account = self.acctSvrc.getAccount();
            //console.log("TransactionsPage.onAccountEvent() self.account: " + self.account);
            //console.log("TransactionsPage.onAccountEvent() self.account.balance: " + self.account.balance);
        }
    }

    resetTransaction() {
        return [this.commonSvrc.initTransaction(this, 'XLM', 0),
                this.commonSvrc.initTransaction(this, 'GHS', -10)
               ];
    }

    createContact(item: CommonConstants.ITransaction) {
        this.transItem = {
            effectId: item.effectId,
            asset_code: item.asset_code,
            amount: item.amount,
            debit: item.debit,
            sender: item.sender,
            receiver: item.receiver,
            memo: item.memo,
            memoType: item.memoType,
            creationDate: item.creationDate,
            creationTimestamp: item.creationTimestamp,
            remoteContact: item.remoteContact
        }
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

}
