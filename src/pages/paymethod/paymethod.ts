import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

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
        { label: 'Direct payment within platform', checked: 'false', value: 'WITHIN_PLATFORM_DIRECT' },
        { label: 'Direct payment between platforms', checked: 'false', value: 'BETWEEN_PLATFORMS_DIRECT' },
        { label: 'Payment through anchor using one account', checked: 'true', value: 'WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT' },
        { label: 'Payment through anchor each client has own account', checked: 'false', value: 'WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT' },
        { label: 'Payment through anchor between platforms', checked: 'false', value: 'BETWEEN_PLATFORMS_ANCHOR' }
    ];

    // set default payment method
    paymethod: string = CommonConstants.PaymentMethod[CommonConstants.PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT];

    constructor(private comSrvc: CommonService, private navCtrl: NavController, public menuCtrl: MenuController) { }

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

}
