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
    templateUrl: 'appmode.html',
})
export class AppmodePage {
    appmode: string = CommonConstants.AppMode[CommonConstants.AppMode.DEV];

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

    appModeChanged(ev) {
        if (ev !== undefined) {
            //console.log('AppmodePage ev: ' + ev);
            this.appmode = ev;
            //console.log('AppmodePage this.appmode: ' + this.appmode);
            this.comSrvc.setAppMode(this.appmode);
        }
    }

    getTranslate(key: string) {
        return this.translateService.instant(key);
    }

}
