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
    templateUrl: 'paymethod.html'
})
export class PaymethodPage {
   
    paymentMethods: CommonConstants.IRadioGroupItem[] = [
        { label: 'paymethod.within_platform_direct', checked: 'false', value: 'WITHIN_PLATFORM_DIRECT' },
        { label: 'paymethod.between_platforms_direct', checked: 'false', value: 'BETWEEN_PLATFORMS_DIRECT' },
        { label: 'paymethod.within_platform_anchor_one_account', checked: 'true', value: 'WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT' },
        { label: 'paymethod.within_platform_anchor_multi_account', checked: 'false', value: 'WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT' },
        { label: 'paymethod.between_platforms_anchor_one_account', checked: 'false', value: 'BETWEEN_PLATFORMS_ANCHOR_ONE_ACCOUNT' },
        { label: 'paymethod.between_platforms_anchor_multi_account', checked: 'false', value: 'BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT' }
    ];

    // set default payment method
    paymethod: string = CommonConstants.PaymentMethod[CommonConstants.PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT];

    constructor(private navCtrl: NavController, public menuCtrl: MenuController,
        public translateService: TranslateService,
        private comSrvc: CommonService) { }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    paymethodChanged(ev) {
        if (ev !== undefined) {
            //console.log('paymethodChanged: ', ev);
            this.paymethod = ev;
            //console.log('paymethod: ', this.paymethod);
            this.comSrvc.setPayMethod(this.paymethod);
        }
    }

    getTranslate(key: string) {
        return this.translateService.instant(key);
    }

}
