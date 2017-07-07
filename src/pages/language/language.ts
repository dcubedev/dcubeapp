import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';

/*
  Author: Stephen Agyepong
*/

@Component({
  templateUrl: 'language.html',
})
export class LanguagePage {
    Languages = {
        available: ['ak', 'en', 'es', 'fr', 'sw', 'yo', 'zu'],
        selected: null
    }

    supportedLanguages: CommonConstants.IRadioGroupItem[] = [
        { label: 'lang.ak', checked: 'false', value: 'ak' },
        { label: 'lang.en', checked: 'true', value: 'en' },
        { label: 'lang.es', checked: 'false', value: 'es' },
        { label: 'lang.fr', checked: 'false', value: 'fr' },
        { label: 'lang.sw', checked: 'false', value: 'sw' },
        { label: 'lang.yo', checked: 'false', value: 'yo' },
        { label: 'lang.zu', checked: 'false', value: 'zu' }
    ];
    lang: string = 'en';

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

    langChanged(ev) {
        if (ev !== undefined) {
            //console.log('langChanged', ev);
            this.lang = ev;
            //console.log('lang', this.lang);
            this.comSrvc.setAppLanguage(this.lang);
        }
    }

    getTranslate(key: string) {
        return this.translateService.instant(key);
    }

}
