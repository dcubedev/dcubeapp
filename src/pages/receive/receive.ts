import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { CommonService } from '../../providers/common-service/common-service';
import * as CommonConstants from '../../providers/common-service/common-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'receive.html'
})
export class ReceivePage {
    account: CommonConstants.IAccount;

    constructor(private navCtrl: NavController, public menuCtrl: MenuController, private commonSvrc: CommonService) {

    }

    ngOnInit() {
        this.commonSvrc.initAccount(this);
        //console.log("Entering DemoPage.ngOnInit() this.commonSvrc.appCurr: " + this.commonSvrc.appCurr);
        //this.keysStored = this.keySettingsService.loadKeysStore();
        //console.log("DemoPage.ngOnInit() this.keysStored: " + this.keysStored);
        //console.log("Entering DemoPage.ngOnInit() this.keysStored.address: " + this.keysStored.address);
        //this.getAccountBalances();
        //this.commonSvrc.commonEvents$.subscribe(commonevt => this.onCommonEvent(commonevt));
    }

    share() {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

}
