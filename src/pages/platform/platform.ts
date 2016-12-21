import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';


/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'platform.html'
})
export class PlatformPage {
 
    supportedPlatforms: CommonConstants.IRadioGroupItem[] = [
        { label: 'Stellar', checked: 'true', value: 'STELLAR' },
        { label: 'Ripple', checked: 'false', value: 'RIPPLE' },
        { label: 'Uphold', checked: 'false', value: 'UPHOLD' }
    ];

    // set default digital currency platform
    appplatform: string = CommonConstants.AppPlatform[CommonConstants.AppPlatform.STELLAR];

    constructor(private comSrvc: CommonService, private navCtrl: NavController, public menuCtrl: MenuController) {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    platformChanged(ev) {
        if (ev !== undefined) {
            //console.log('platformChanged: ', ev);
            this.appplatform = ev;
            //console.log('appplatform: ', this.appplatform);
            this.comSrvc.setAppPlatform(this.appplatform);
        }
    }

}
