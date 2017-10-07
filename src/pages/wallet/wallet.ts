import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';
import { SwitchPageService } from '../../providers/common-service/switch-page-service';

import { KeySettingsService } from '../../providers/platform/stellar/key-settings-service';
import { AccountService } from '../../providers/platform/stellar/account-service';

import { TabsPage } from '../tabs/tabs';

/*
  Author: Stephen Agyepong

    This component displays information about the given wallet
*/


@Component({
    templateUrl: 'wallet.html'
})
export class WalletPage implements OnInit{
    
    constructor(private navCtrl: NavController,
        private menuCtrl: MenuController,
        private acctSvrc: AccountService,
        private keySvrc: KeySettingsService,
        private commonSvrc: CommonService) {
    }

    ngAfterViewInit() {
        //console.log("WalletPage::ngAfterViewInit() tloginpage: " + this.tloginpage);
        //console.log("WalletPage::ngAfterViewInit() mytloginContent: " + this.mytloginContent);
    }

    ngOnInit() {
        //this.keySvrc.onKeyEvent(this, this.onKeyEvent);

        //this.getAccountBalances();
        //this.commonSvrc.initAccount(this);
        //this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
    }

    home() {
        this.navCtrl.push(TabsPage);
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

}
