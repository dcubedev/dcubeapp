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
    templateUrl: 'currency.html',
})
export class CurrencyPage { 
    supportedCurrencies: CommonConstants.IRadioGroupItem[] = [
        { label: 'currency.btc', checked: 'false', value: 'BTC' },
        { label: 'currency.eur', checked: 'false', value: 'EUR' },
        { label: 'currency.funt', checked: 'false', value: 'FUNT' },
        { label: 'currency.gbp', checked: 'false', value: 'GBP' },
        { label: 'currency.ghs', checked: 'false', value: 'GHS' },
        { label: 'currency.ngn', checked: 'false', value: 'NGN' },
        { label: 'currency.ugx', checked: 'false', value: 'UGX' },
        { label: 'currency.usd', checked: 'true', value: 'USD' },
        { label: 'currency.xlm', checked: 'false', value: 'XLM' },
        { label: 'currency.xof', checked: 'false', value: 'XOF' },
        { label: 'currency.zar', checked: 'false', value: 'ZAR' }
    ];

    // XOF	Communauté Financière Africaine (BCEAO) Franc
    //curr: string = CommonConstants.AppCurrency[CommonConstants.AppCurrency.XOF];
    //curr: string = CommonConstants.AppCurrency[CommonConstants.AppCurrency.XLM];
    curr: string = CommonConstants.AppCurrency[CommonConstants.AppCurrency.USD];

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

    currencyChanged(ev) {
        if (ev !== undefined) {
            //console.log('currencyChanged: ', ev);
            this.curr = ev;
            //console.log('currency: ', this.curr);
            this.comSrvc.setAppCurrency(this.curr);
        }
    }

    getTranslate(key: string) {
        return this.translateService.instant(key);
    }

}
