import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';

import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';


/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'grouptypes.html',
})
export class GroupTypesPage {
    groupTypes: CommonConstants.IRadioGroupItem[] = [
        { label: 'grptypes.asca', checked: 'true', value: 'ASCA' },
        { label: 'grptypes.rosca', checked: 'false', value: 'ROSCA' },
        { label: 'grptypes.consumer', checked: 'false', value: 'Consumer' },
        { label: 'grptypes.producer', checked: 'false', value: 'Producer' },
        { label: 'grptypes.worker', checked: 'false', value: 'Worker' },
        { label: 'grptypes.purchasing', checked: 'false', value: 'Purchasing' },
        { label: 'grptypes.hybrid', checked: 'false', value: 'Hybrid' }
    ];

    grouptypes: string = 'ASCA';

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

    groupTypesChanged(ev) {
        if (ev !== undefined) {
            //console.log('groupTypesChanged ev: ' + ev);
            this.grouptypes = ev;
            //console.log('groupTypesChanged this.grouptypes: ' + this.grouptypes);
            //this.comSrvc.setAppMode(this.grouptypes);
        }
    }

    getTranslate(key: string) {
        return this.translateService.instant(key);
    }

}
