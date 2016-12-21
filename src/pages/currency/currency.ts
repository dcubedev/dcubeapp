import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'currency.html',
})
export class CurrencyPage { 
    supportedCurrencies: CommonConstants.IRadioGroupItem[] = [
        { label: 'Bitcoin', checked: 'false', value: 'BTC' },
        { label: 'Euro', checked: 'false', value: 'EUR' },
        { label: 'FunTracker', checked: 'false', value: 'FUNT' },
        { label: 'British Pound', checked: 'false', value: 'GBP' },
        { label: 'Ghanaian Cedi', checked: 'false', value: 'GHS' },
        { label: 'Nigerian Naira', checked: 'false', value: 'NGN' },
        { label: 'Ugandan Shilling', checked: 'false', value: 'UGX' },
        { label: 'US Dollar', checked: 'true', value: 'USD' },
        { label: 'Stellar Lumen', checked: 'false', value: 'XLM' },
        { label: 'West African CFA', checked: 'false', value: 'XOF' },
        { label: 'South African Rand', checked: 'false', value: 'ZAR' }
    ];

    // XOF	Communauté Financière Africaine (BCEAO) Franc
    //curr: string = CommonConstants.AppCurrency[CommonConstants.AppCurrency.XOF];
    //curr: string = CommonConstants.AppCurrency[CommonConstants.AppCurrency.XLM];
    curr: string = CommonConstants.AppCurrency[CommonConstants.AppCurrency.USD];

    constructor(private comSrvc: CommonService, private navCtrl: NavController, public menuCtrl: MenuController) {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    currencyChanged(ev) {
        if (ev !== undefined) {
            //console.log('currencyChanged: ', ev);
            this.curr = ev;
            //console.log('currency: ', this.curr);
            this.comSrvc.setAppCurrency(this.curr);
        }
    }

}
