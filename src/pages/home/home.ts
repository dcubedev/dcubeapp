import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';

import { KeySettingsService } from '../../providers/platform/stellar/key-settings-service';
import { AccountService } from '../../providers/platform/stellar/account-service';

/*
  Author: Stephen Agyepong

    This component displays information about the given home page
*/


@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  account: CommonConstants.IAccount;
  accountBalances: CommonConstants.IAccountBalance[] = null;
  keysStored: CommonConstants.IWalletKey;
  accountBalanceCalls: number = 0;

  constructor(private navCtrl: NavController,
    private menuCtrl: MenuController,
    private acctSvrc: AccountService,
    private keySvrc: KeySettingsService,
    private commonSvrc: CommonService) {
  }

  ngOnInit() {
    this.keySvrc.onKeyEvent(this, this.onKeyEvent);

    this.getAccountBalances();
    this.commonSvrc.initAccount(this);
    this.commonSvrc.onCommonEvent(this, this.oncommonEvents);
    this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
  }

  oncommonEvents(self, commonevt: any) {
    if ((undefined !== commonevt.status) &&
      (CommonConstants.SOURCEOFKEYS_CHANGED == commonevt.memo)) {
      self.acctSvrc.getAccountBalances(commonevt.status);
    }
  }

  onKeyEvent(self, acctevt) {
    console.log("home::onKeyEvent() acctevt: " + acctevt);
    self.keysStored = acctevt.status;
    console.log("home::onKeyEvent() acctevt.memo: " + acctevt.memo);
    console.log("home::onKeyEvent() self.keysStored: " + JSON.stringify(self.keysStored));

    // if we have a valid key address and account balance is not set
    console.log("home::onKeyEvent() self.accountBalances: " + self.accountBalances);
    console.log("home::onKeyEvent() self.keysStored.address: " + self.keysStored.address);
    console.log("home::onKeyEvent() (undefined !== self.keysStored): " + (undefined !== self.keysStored));
    console.log("home::onKeyEvent() (null !== self.keysStored): " + (null !== self.keysStored));
    
    if ((undefined !== self.keysStored) && (null !== self.keysStored)) {
      let address = self.keysStored['acctkeyId'];
      console.log("home::onKeyEvent() address: " + address);
      if ((self.accountBalanceCalls < 3)
        && (undefined !== address) && (null !== address) && (address.length > 0)
        && (((null !== self.accountBalances) && (self.accountBalances.length < 1)) ||
             (null === self.accountBalances))) {
        self.accountBalanceCalls++;
        console.log("home::onKeyEvent() self.accountBalanceCalls: " + self.accountBalanceCalls);
        self.getAccountBalances();
      }
    }
  }

  onAccountEvent(self, acctevt: any) {
    //console.log("home::onAccountEvent() acctevt.memo: " + acctevt.memo);
    if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
      self.account = self.acctSvrc.getAccount();
    }

    if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
      self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
    }
  }

  getAccountBalances() {
    console.log("home::getAccountBalances() called");
    this.acctSvrc.getAccountBalances();
  }

  getAccountBalancesUseStellarBalances() {
    let self = this;
    //console.log("getAccountBalances() this.keysStored.address: " + this.keysStored.address);
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
