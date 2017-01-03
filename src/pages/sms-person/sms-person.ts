import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';
import { RequestMethod, Headers, RequestOptionsArgs } from '@angular/http';

//import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem, Message} from 'primeng/primeng';            //api

import { CommonService } from '../../providers/common-service/common-service';

/*
  Author: Stephen Agyepong
*/

export interface Person {
    cardId?;
    name?;
    surname?;
    country?;
}

@Component({
    templateUrl: 'sms-person.html',
})
export class QuickSmsPage implements OnInit {
    persons: Person[];
    cols: any[];
    text: string;
    displayablePerson: Person = new DisplayablePerson();
    displayDialog: boolean;
    selectedPerson: Person;

    msgs: Message[] = [];
    items: MenuItem[];

    newPerson: boolean;
    smsForm: FormGroup;
    msgSizeArea: string;
    appmode: string;

    constructor(private http: Http,
        private navCtrl: NavController,
        private menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private commonSvrc: CommonService) {

        this.appmode = commonSvrc.appMode;
        this.msgSizeArea = "0";

        this.smsForm = this.formBuilder.group({
            sendAll: [''],
            msgTitle: [''],
            phoneNumber: [''],
            email: [''],
            msgTextArea: ['']
        });
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    getPersons() {
        return this.http.get('assets/config/persons.json')
            .toPromise()
            .then(res => <Person[]>res.json().data)
            .then(data => {
                return data;
            })
    }

    sendSMS() {
        let self = this;
        let url_p = this.commonSvrc.url_scom + "send";
        let body_p = null;

        if (url_p != null) {
            let contentType = 'application/json';
            let headers = new Headers();
            headers.append('Content-Type', contentType);
            //headers.append('Content-Type', 'application/text');
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');
            //headers.append('Origin', 'http://localhost:8080');
            var reqOptions: RequestOptionsArgs = {
                url: null,
                method: RequestMethod.Post,
                search: null,
                headers: headers,
                body: null
            };

            let pnumbers = self.smsForm.controls['phoneNumber'].value;
            let phoneNumbers = pnumbers.split(",");
            let msgTextArea = self.smsForm.controls['msgTextArea'].value;

            //{"numbers":["14044280700","14047191972"], "message":"Test message from Yaw"}'
            let numbers: string = '{"numbers":["';
            let len_minus1: number = phoneNumbers.length - 1;
            for (let i = 0; i < phoneNumbers.length; i++) {
                if (len_minus1 === i) {
                    numbers = numbers + phoneNumbers[i];
                } else {
                    numbers += phoneNumbers[i] + '","';
                }
            }
            numbers = numbers + '"], ';

            let message: string = '"message":"' + msgTextArea + '"}';

            body_p = numbers + message;

            console.log("sendSMS() url_p: " + url_p);
            console.log("sendSMS() body_p: " + body_p);
            this.commonSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
                console.log("sendSMS() data: " + JSON.stringify(data));
                //console.log("sendSMS() data: " + data);
            }, err => {
                console.log("sendSMS() err: " + JSON.stringify(err));
                //console.log("sendSMS() err: " + err);
            })
        }
    }

    sendEmail() {
        let self = this;
        let url_p = this.commonSvrc.url_scom + "send";
        let body_p = null;

        if (url_p != null) {
            let contentType = 'application/json';
            let headers = new Headers();
            headers.append('Content-Type', contentType);
            //headers.append('Content-Type', 'application/text');
            //headers.append('Content-Type', 'application/x-www-form-urlencoded');
            //headers.append('Origin', 'http://localhost:8080');
            var reqOptions: RequestOptionsArgs = {
                url: null,
                method: RequestMethod.Post,
                search: null,
                headers: headers,
                body: null
            };

            let msgTitle = self.smsForm.controls['msgTitle'].value;
            let email = self.smsForm.controls['email'].value;
            let msgTextArea = self.smsForm.controls['msgTextArea'].value;

            let title: string = '{"title": "' + msgTitle + '"}, ';
            let to: string = '"to": "' + email + '", ';
            let message: string = '"message":"' + msgTextArea + '"}';

            body_p = title + to + message;

            console.log("sendSMS() url_p: " + url_p);
            console.log("sendSMS() body_p: " + body_p);
            this.commonSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
                console.log("sendSMS() data: " + JSON.stringify(data));
                //console.log("sendSMS() data: " + data);
            }, err => {
                console.log("sendSMS() err: " + JSON.stringify(err));
                //console.log("sendSMS() err: " + err);
            })
        }
    }

    logForm() {
        console.log("smsForm.dirty: " + this.smsForm.dirty);
        console.log("smsForm.valid: " + this.smsForm.valid);
        console.log(this.smsForm.value);
    }

    ngOnInit() {
        this.getPersons().then(persons => this.persons = persons);

        this.cols = [
            { field: 'cardId', header: 'Card ID' },
            { field: 'name', header: 'Name' },
            { field: 'surname', header: 'Surname' },
            { field: 'country', header: 'Country' }
        ];

        this.items = [
            {
                label: 'Update', icon: 'fa-refresh', command: () => {
                    this.updateSB();
                }
            },
            {
                label: 'Delete', icon: 'fa-close', command: () => {
                    this.deleteSB();
                }
            },
            {
                label: 'Angular.io', icon: 'fa-link', command: () => {
                    this.updateSB();
                } },
            {
                label: 'Theming', icon: 'fa-paint-brush', command: () => {
                    this.saveSB();
                } }
        ];
    }

    showDialogToAdd() {
        this.newPerson = true;
        this.displayablePerson = new DisplayablePerson();
        this.displayDialog = true;
    }

    showDialogToEdit() {
        this.displayDialog = true;
    }

    save() {
        if (this.newPerson)
            this.persons.push(this.displayablePerson);
        else
            this.persons[this.findSelectedPersonIndex()] = this.displayablePerson;

        this.displayablePerson = null;
        this.displayDialog = false;
    }

    delete() {
        this.persons.splice(this.findSelectedPersonIndex(), 1);
        this.displayablePerson = null;
        this.selectedPerson = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newPerson = false;
        this.displayablePerson = this.clonePerson(event.data);
    }

    findSelectedPersonIndex(): number {
        return this.persons.indexOf(this.selectedPerson);
    }

    clonePerson(c: Person): Person {
        let displayablePerson = new DisplayablePerson();
        for (let prop in c) {
            displayablePerson[prop] = c[prop];
        }
        return displayablePerson;
    }


    saveSB() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Saved' });
    }

    updateSB() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Updated' });
    }

    deleteSB() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Deleted' });
    }

}

class DisplayablePerson implements Person {

    constructor(public cardId?, public name?, public surname?, public country?) {
    }
}


