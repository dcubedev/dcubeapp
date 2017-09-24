import { Component } from '@angular/core';

import { NavController, AlertController} from 'ionic-angular';


@Component({
    selector: 'thome',
    templateUrl: 'thome.html'
})
export class ThomePage {
    createSuccess = false;
    homeOptions = {
        initialSlide: 0,
        loop: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        pager: true
    };

    //passing an instance of the FormBuilder to the constructor
    constructor(public navCtrl: NavController) {
    }

    forgotpasswd() {
        //this.navCtrl.push(this.registerPage);
        // this.navCtrl.setRoot(this.registerPage);
    }

    logon() {
        // this.navCtrl.push(AppClientPage);
    }

}
