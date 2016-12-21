import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'about.html'
})
export class AboutPage {

    constructor(private navCtrl: NavController, private menuCtrl: MenuController) {

    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

}
