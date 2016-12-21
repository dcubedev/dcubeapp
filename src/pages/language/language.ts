import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

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
        available: ['ak', 'de', 'en', 'es', 'fr', 'nl'],
        selected: null
    }

    supportedLanguages: CommonConstants.IRadioGroupItem[] = [
        //{ label: 'Akan', checked: 'false', value: 'ak' },
        { label: 'English', checked: 'true', value: 'en' },
        { label: 'Spanish', checked: 'false', value: 'es' },
        { label: 'French', checked: 'false', value: 'fr' },
        //{ label: 'Swahili', checked: 'false', value: 'sw' },
        //{ label: 'Yoruba', checked: 'false', value: 'yo' },
        //{ label: 'Zulu', checked: 'false', value: 'zu' }
    ];
    lang: string = 'en';

    constructor(private comSrvc: CommonService, private navCtrl: NavController, public menuCtrl: MenuController) {
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

}
