import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

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
        { label: 'Accumulating Savings and Credit Associations', checked: 'true', value: 'ASCA' },
        { label: 'Rotating Savings and Credit Associations', checked: 'false', value: 'ROSCA' },
        { label: 'Consumer Cooperative', checked: 'false', value: 'Consumer' },
        { label: 'Producer Cooperative', checked: 'false', value: 'Producer' },
        { label: 'Worker Cooperative', checked: 'false', value: 'Worker' },
        { label: 'Purchasing Cooperative', checked: 'false', value: 'Purchasing' },
        { label: 'Hybrid Cooperative', checked: 'false', value: 'Hybrid' }
    ];

    grouptypes: string = 'ASCA';

    constructor(private comSrvc: CommonService, private navCtrl: NavController, public menuCtrl: MenuController) {
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

}
