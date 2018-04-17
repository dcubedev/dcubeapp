import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Contacts } from '@ionic-native/contacts';
import { ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { ModalController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AddContactPage } from './add-contact/add-contact';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'contacts.html',
})
export class ContactsPage {
    contactsfound = [];
    search = false;

    constructor(private navCtrl: NavController, public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        private alertController: AlertController,
        private contacts: Contacts) {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    newContact() {
        this.navCtrl.push(AddContactPage);
    }

    itemSelected(item) {
        //const contactModal = this.modalCtrl.create(Profile, item);
        //contactModal.present();

        this.contacts.pickContact().then((value) => {
            console.log('itemSelected() selected value: ', value);
        }, (error) => {
            console.log('itemSelected() error: ' + error);
        });
    }

    contactSelected(item: any) {
        const contactModal = this.modalCtrl.create(AddContactPage, item);
        contactModal.present();
    }

    cancel() {
        this.navCtrl.pop();
    }

    findContact(event: any) {
      /*
        let fields: ContactFieldType[] = ['addresses', 'birthday', 'categories', 'country',
            'department', 'displayName', 'emails', 'familyName', 'formatted',
            'givenName', 'honorificPrefix', 'honorificSuffix', 'id', 'ims', 'locality',
            'middleName', 'name', 'nickname', 'note', 'organizations', 'phoneNumbers',
            'photos', 'postalCode', 'region', 'streetAddress', 'title', 'urls'];
       */
      let fields: ContactFieldType[] = ['addresses', 'birthday',
        'categories', 'country', 'department', 'displayName', 'emails',
        'name.familyName', 'name.formatted', 'name.givenName', 'name.honorificPrefix', 'name.honorificSuffix',
        'id', 'ims',
        'locality', 'name.middleName', 'name', 'nickname', 'note', 'organizations', 'phoneNumbers',
        'photos', 'postalCode', 'region', 'streetAddress', 'title', 'urls'];

        const options = new ContactFindOptions();
        options.filter = event.target.value;
        options.multiple = true;
        options.desiredFields = fields;

        this.contacts.find(fields, options).then((contacts) => {
            this.contactsfound = contacts;
        });

        if (this.contactsfound.length == 0) {
            this.contactsfound.push({ displayName: 'No Contacts found' });
        }
        this.search = true;
    }

}
