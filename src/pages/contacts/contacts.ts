import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'contacts.html',
})
export class ContactsPage {
    Contacts = [
        {
            name: 'DcubeFoundation',
            address: null,
            memo: null,
            memoType: null
        }
    ];

    constructor(private navCtrl: NavController, public menuCtrl: MenuController) {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }
}
