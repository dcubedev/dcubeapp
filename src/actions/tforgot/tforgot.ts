import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { ForgotPage } from '../forgot/forgot';

/*
 * Author: Stephen Agyepong
 */
@Component({
    selector: 'tforgot',
    templateUrl: 'tforgot.html'
})
export class TforgotPage {
    forgotPage: any;
   
    constructor(private navCtrl: NavController,
        public menuCtrl: MenuController) {
    }

    ngOnInit() {
        this.forgotPage = ForgotPage;
    }

    forgotpasswd() {
        this.navCtrl.push(this.forgotPage);
        // this.navCtrl.setRoot(this.forgotPage);
    }

}
