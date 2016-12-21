import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as CommonConstants from '../../providers/common-service/common-service';

/*
  Author: Stephen Agyepong

    This component allows the user to send assets (currency, etc)
*/


@Component({
    templateUrl: 'send.html'
})
export class SendPage {
    showDestTag: boolean = true;

    public destInfo: CommonConstants.IDestinationInfo;
    public paymentData: CommonConstants.IPaymentData;
    public transactionContext: CommonConstants.ITransactionContext;

    constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
      this.init();
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

}
