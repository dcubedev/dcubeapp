import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

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
        { label: 'platform.stellar', checked: 'true', value: 'STELLAR' },
        { label: 'platform.ripple', checked: 'false', value: 'RIPPLE' },
        { label: 'platform.uphold', checked: 'false', value: 'UPHOLD' }
    ];

    // set default digital currency platform
    appplatform: string = CommonConstants.AppPlatform[CommonConstants.AppPlatform.STELLAR];

    constructor(private navCtrl: NavController, public menuCtrl: MenuController,
        public translateService: TranslateService,
        private comSrvc: CommonService) {
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

    getTranslate(key: string) {
        return this.translateService.instant(key);
    }

}
