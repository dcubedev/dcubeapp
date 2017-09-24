import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';
import { RequestMethod, Headers, RequestOptionsArgs } from '@angular/http';

import { CommonService } from '../../../providers/common-service/common-service';
import { RemoteService } from '../../../providers/remote-service/remote-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'quick-sms-form.html',
})
export class QuickSmsFormPage {
    smsForm: FormGroup;
    msgSizeArea: string;
    appmode: string;

    constructor(private navCtrl: NavController,
        private menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private commonSvrc: CommonService,
        private remoteSvrc: RemoteService) {

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

    sendSMS() {
        let self = this;
        let url_p = this.commonSvrc.url_scom + "sms/send";
        let body_p: string = null;

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
            this.msgSizeArea = '' + body_p.length;

            console.log("sendSMS() url_p: " + url_p);
            console.log("sendSMS() body_p: " + body_p);
            this.remoteSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
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
        let url_p = this.commonSvrc.url_scom + "sms/send";
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
            this.remoteSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
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

    insertScomAppData() {
        let url_p = this.commonSvrc.url_scom + "application";
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

            body_p = '{"appCode":"001","appName":"Test Application1","status":"a"}';

            console.log("insertScomAppData() url_p: " + url_p);
            console.log("insertScomAppData() body_p: " + body_p);
            this.remoteSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
                console.log("insertScomAppData() data: " + JSON.stringify(data));
                //console.log("insertScomAppData() data: " + data);
            }, err => {
                console.log("insertScomAppData() err: " + JSON.stringify(err));
                //console.log("insertScomAppData() err: " + err);
            })
        }
    }

    getScomAppData() {
        let url_p = this.commonSvrc.url_scom + "application/001";

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

            console.log("getScomAppData() url_p: " + url_p);

            this.remoteSvrc.getHttp(url_p, reqOptions).then(data => {
                console.log("getScomAppData() data: " + JSON.stringify(data));
                //console.log("getScomAppData() data: " + data);
            }, err => {
                console.log("getScomAppData() err: " + JSON.stringify(err));
                //console.log("getScomAppData() err: " + err);
            })
        }
    }

}
