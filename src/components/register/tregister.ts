import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { RegisterPage } from './register';

/*
 * Author: Stephen Agyepong
 */
@Component({
    selector: 'tregister',
    templateUrl: 'tregister.html'
})
export class TregisterPage {
    registerPage: any;
   
    constructor(private navCtrl: NavController,
        public menuCtrl: MenuController) {
    }

    ngOnInit() {
        this.registerPage = RegisterPage;
    }

    register() {
        this.navCtrl.push(this.registerPage);
        // this.navCtrl.setRoot(this.registerPage);
    }

}
