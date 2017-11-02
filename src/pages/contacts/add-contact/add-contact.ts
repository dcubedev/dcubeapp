import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, IContactField, IContactName,ContactName } from '@ionic-native/contacts';

export enum PymtAddrType {
    ANCHOR,
    PYMTADDR
}

@Component({
    selector: 'page-add-contact',
    templateUrl: 'add-contact.html'
})
export class AddContactPage {
    contactObject = {
        displayName: '',
        anchorName: '',
        fullName: '',
        lname: '',
        mname: '',
        fname: '',
        nickname: '',
        useFullname: true,
        pymtAddr: '',
        isAnchor: false,
        anchorUrl: '',
        pymtUrl: '',
        phoneNumber: '',
        phoneType: '',
        phonePref: false,
        email: '',
        relation: ''
    }

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private contacts: Contacts) {
   
        if ((undefined !== this.navParams) && (null !== this.navParams)) {
            this.editContact(this.navParams);
        }
    }

    ngOnInit() {
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad AddContactPage');
    }

    setupAnchors() {
        this.saveAsContactAnchor('DCUBE', 'GC22N6VIRYAGCJDS6OKO2YZKWWT2DPIRR66QLNJU2GCKGCIFWR6E7BVY', 'https://www.dcubedev.com', 'https://www.dcubedev.com');
        this.saveAsContactAnchor('FUNTRACKER', 'GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU', 'https://www.funtracker.site', 'https://www.funtracker.site');
    }

    isAnchorChanged() {
        console.log("isAnchorChanged() this.contactObject.isAnchor: " + this.contactObject.isAnchor);
    }

    isAnchor(item: string) {
        let pymtAddrType: string = PymtAddrType[PymtAddrType.ANCHOR];
        if (pymtAddrType === item) {
            return true;
        }

        return false;
    }

    isPymtAddress(itemType) {
        function isPymtAddr(item: string) {
            let pymtAddrType: string = PymtAddrType[PymtAddrType.PYMTADDR];
            if (pymtAddrType === item) {
                return true;
            }

            return false;
        }

        if (isPymtAddr(itemType) || this.isAnchor(itemType)) {
            return true;
        }

        return false;
    }

    nameChanged() {
        this.contactObject.useFullname = false;
        this.contactObject.fullName = this.getFullName().formatted;
    }

    cancel() {
        this.navCtrl.pop();
    }

    getFullName(): IContactName {
        let name = new ContactName();
        if (('' === this.contactObject.fname) && ('' === this.contactObject.lname)) {
        } else {
            name.givenName = this.contactObject.fname;
            name.familyName = this.contactObject.lname;

            if ('' == this.contactObject.mname) {
                name.formatted = this.contactObject.fname + ' ' + this.contactObject.lname;
            } else {
                name.middleName = this.contactObject.mname;
                name.formatted = this.contactObject.fname + ' ' + this.contactObject.mname + ' ' + this.contactObject.lname;
            }
        }

        return name;
    }

    
    editContact(param: any) {
        let selectedContact: Contact = param.data;
        console.log('editContact() selected selectedContact: ' + selectedContact);
        console.log('editContact() selected selectedContact.displayName: ' + selectedContact.displayName);
        console.log('editContact() selected selectedContact.nickname: ' + selectedContact.nickname);
        console.log('editContact() selected selectedContact.name: ' + selectedContact.name);
        console.log('editContact() selected selectedContact.phoneNumbers: ' + selectedContact.phoneNumbers);
        console.log('editContact() selected selectedContact.emails: ' + selectedContact.emails);
        console.log('editContact() selected selectedContact.categories: ' + selectedContact.categories);
        console.log('editContact() selected selectedContact.urls: ' + selectedContact.urls);

        let name: IContactName = selectedContact.name;
        let phoneNumbers: IContactField = selectedContact.phoneNumbers;
        let emails: IContactField[] = selectedContact.emails;
        let categories: IContactField[] = selectedContact.categories;
        let urls: IContactField[] = selectedContact.urls;

        if (null != selectedContact.displayName) {
            this.contactObject.anchorName = selectedContact.displayName;
            this.contactObject.displayName = selectedContact.displayName;
        }

        if (null != selectedContact.nickname) {
            this.contactObject.nickname = selectedContact.nickname;
        }

        if (null != name) {
            this.contactObject.fullName;
            this.contactObject.lname;
            this.contactObject.mname;
            this.contactObject.fname;
            this.contactObject.useFullname = false;
        }

        if (null != phoneNumbers) {
            this.contactObject.phoneNumber;
            this.contactObject.phoneType;
            this.contactObject.phonePref;
        }

        if (null != emails) {
            this.contactObject.email;
        }

        if (null != categories) {
            this.contactObject.pymtAddr;
            
            this.contactObject.relation;
        }

        if (null != urls) {
            this.contactObject.anchorName = selectedContact.displayName;
            this.contactObject.isAnchor;
            this.contactObject.anchorUrl;
            this.contactObject.pymtUrl;
        }

        //let customContacts = selectedContact.categories;
        //this.contactObject.anchorUrl = customContacts[0].value;
        //this.contactObject.pymtUrl = customContacts[1].value;
  
    }

    saveContact(newContact: any) {
        console.log("saveContact() newContact: " + newContact);

        //let name: IContactName;
        let phoneNumbers = [];
        let emails = [];
        //let addresses = [];
        //let ims = [];
        let customContacts = [];
        let urls = [];
        
        let contact: Contact = this.contacts.create();
        let name = null;

        if ('' !== newContact.anchorName) {
            contact.displayName = newContact.anchorName;
        }

        if ( '' !== newContact.lname ) {
            name = this.getFullName();
            contact.name = name;
        }

        // payment addresses
        if ('' !== newContact.pymtAddr) {
            let cf_pymtAddr = new ContactField();
            cf_pymtAddr.type = 'pymtAddr';
            cf_pymtAddr.value = newContact.pymtAddr;
            cf_pymtAddr.pref = false;
            customContacts.push(cf_pymtAddr);
        }

        //var cf_addr = new ContactAddress();

        if ('' !== newContact.phoneNumber) {
            let cf_phone = new ContactField();
            cf_phone.value = newContact.phoneNumber;
            cf_phone.type = newContact.phoneType;
            cf_phone.pref = newContact.phonePref;
            phoneNumbers.push(cf_phone);
            contact.phoneNumbers = phoneNumbers;
        }

        if ('' !== newContact.email) {
            let cf_email = new ContactField();
            cf_email.type = 'email';
            cf_email.value = newContact.email;
            cf_email.pref = false;
            emails.push(cf_email);
            contact.emails = emails;
        }

        if ('' !== newContact.relation) {
            let cf_relation = new ContactField();
            cf_relation.type = 'relation';
            cf_relation.value = newContact.relation;
            cf_relation.pref = false;
            customContacts.push(cf_relation);
        }

        if (customContacts.length > 0) {
            contact.categories = customContacts;
        }

        if (newContact.isAnchor) {
            if ('' !== newContact.anchorUrl) {
                let cf_anchorUrl = new ContactField();
                cf_anchorUrl.type = 'anchorUrl';
                cf_anchorUrl.value = newContact.anchorUrl;
                cf_anchorUrl.pref = false;
                urls.push(cf_anchorUrl);
            }

            if ('' !== newContact.pymtUrl) {
                let cf_pymtUrl = new ContactField();
                cf_pymtUrl.type = 'pymtUrl';
                cf_pymtUrl.value = newContact.pymtUrl;
                cf_pymtUrl.pref = false;
                urls.push(cf_pymtUrl);
            }

            if (urls.length > 0) {
                contact.urls = urls;
            }
        }

        // if contact is not empty
        let js_contact = JSON.stringify(contact);
        if (('{}' !== js_contact) &&
            ((undefined !== contact['displayName'] && null !== contact['displayName'] && '' !== contact['displayName']) ||
             ((undefined !== contact['name'] && null !== contact['name']) &&
              (null !== contact['name']['formatted'] && null !== contact['name']['formatted'] && '' !== contact['name']['formatted'])) )) {
            contact.save().then((value) => {
                console.log('saveContact() saved: ' + value);
                this.navCtrl.pop();
            }, (error) => {
                console.log('saveContact() error: ' + error);
            })
        }
    }

    //Contacts, Contact, ContactField
    saveAsContactAnchor(anchorName, pymtAddr, anchorUrl, pymtUrl) {
        let customContacts = [];
        let urls = [];

        let contact: Contact = this.contacts.create();
        contact.displayName = anchorName;
        contact.nickname = anchorName;

        let cf_pymtAddr = new ContactField();
        cf_pymtAddr.type = 'pymtAddr';
        cf_pymtAddr.value = pymtAddr;
        cf_pymtAddr.pref = false;
        customContacts.push(cf_pymtAddr);
        contact.categories = customContacts;

        if ('' !== anchorUrl) {
            let cf_anchorUrl = new ContactField();
            cf_anchorUrl.type = 'anchorUrl';
            cf_anchorUrl.value = anchorUrl;
            cf_anchorUrl.pref = false;
            urls.push(cf_anchorUrl);
        }

        if ('' !== pymtUrl) {
            let cf_pymtUrl = new ContactField();
            cf_pymtUrl.type = 'pymtUrl';
            cf_pymtUrl.value = pymtUrl;
            cf_pymtUrl.pref = false;
            urls.push(cf_pymtUrl);
        }

        if (urls.length > 0) {
            contact.urls = urls;
        }

        contact.save().then((value) => {
            console.log('saveAsContactAnchor() saved: ', value);
        }, (error) => {
            console.log('saveAsContactAnchor() error: ' + error);
        })
    }

    pickContact() {
        this.contacts.pickContact().then((value) => {
            console.log('selectContact() selected value: ' + value);
        }, (error) => {
            console.log('selectContact() error: ' + error);
        })
    }

}
