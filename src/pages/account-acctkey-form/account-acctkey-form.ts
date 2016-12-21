import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';
import { RequestMethod, Headers, RequestOptionsArgs } from '@angular/http';

import { CommonService } from '../../providers/common-service/common-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'account-acctkey-form.html',
})
export class AccountAcctkeyFormPage {
    acctAcctkeyForm: FormGroup;
    clientAcctkeyForm: FormGroup;
    acctClientForm: FormGroup;

    outArea: string;

    constructor(private navCtrl: NavController,
        private menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private commonSvrc: CommonService) {

        this.acctAcctkeyForm = this.formBuilder.group({
            acctkeyId: [''],
            accountId: [''],
            startingBalance: [''],
            balanceDate: [''],
            username: ['']
        });
        this.clientAcctkeyForm = this.formBuilder.group({
            acctkeyId: [''],
            clientId: [''],
            username: ['']
        });
        this.acctClientForm = this.formBuilder.group({
            accountId: [''],
            clientId: [''],
            username: ['']
        });
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    getAccountAcctkeyData() {
        let self = this;
        let acctkeyId = this.acctAcctkeyForm.value['acctkeyId'];
        let accountId = this.acctAcctkeyForm.value['accountId'];

        let url_p = null;

        if (acctkeyId != undefined &&
            acctkeyId != null &&
            acctkeyId.length > 10) {
            // "GA6TQPQRV5T6PBINT6UWCTLFFDLU5YCLQR2ZZH5WUZUX3GNTWQ5MEEKB"
            acctkeyId = acctkeyId.trim();
            url_p = this.commonSvrc.url_dcube + "stellar/getAccountAcctkeyByKey?acctkeyid=" + acctkeyId;
        } else {
            if (accountId != undefined &&
                accountId != null &&
                accountId.length > 10) {
                // "d90b3b58-006e-434c-ac40-dcfcce0267b4"
                accountId = accountId.trim();
                url_p = this.commonSvrc.url_dcube + "stellar/getAccountAcctkey?acctid=" + accountId;
            }
        }

        console.log("getAccountAcctkeyData() url_p: " + url_p);
        if (url_p != null) {
            this.commonSvrc.getHttp(url_p).then(data => {
                //console.log("getAccountAcctkeyData() data: " + JSON.stringify(data));
                //console.log("getAccountAcctkeyData() data['acctkeyId']: " + data['acctkeyId']);

                self.acctAcctkeyForm.setValue(data);
                self.clientAcctkeyForm.controls['acctkeyId'].setValue(data['acctkeyId']);
                self.acctClientForm.controls['accountId'].setValue(data['accountId']);
            }, err => {
                console.log("getAccountAcctkeyData() err: " + JSON.stringify(err));
            })
        }
        
    }

    getClientAcctkeyData() {
        let self = this;
        let acctkeyId = this.clientAcctkeyForm.value['acctkeyId'];
        let clientId: string = this.clientAcctkeyForm.value['clientId'];

        let url_p = null;

        if (acctkeyId != undefined &&
            acctkeyId != null &&
            acctkeyId.length > 10) {
            // "GA6TQPQRV5T6PBINT6UWCTLFFDLU5YCLQR2ZZH5WUZUX3GNTWQ5MEEKB"
            acctkeyId = acctkeyId.trim();
            url_p = this.commonSvrc.url_dcube + "stellar/getAccountAcctkeyByKey?acctkeyid=" + acctkeyId;
        } else {
            if (clientId != undefined &&
                clientId != null &&
                clientId.length > 10) {
                // "d90b3b58-006e-434c-ac40-dcfcce0267b4"
                clientId = clientId.trim();
                url_p = this.commonSvrc.url_dcube + "stellar/getAccountAcctkey?acctid=" + clientId;
            }
        }

        if (url_p != null) {
            this.commonSvrc.getHttp(url_p).then(data => {
                //console.log("getClientAcctkeyData() data: " + JSON.stringify(data));
                //console.log("getClientAcctkeyData() data['acctkeyId']: " + data['acctkeyId']);

                self.clientAcctkeyForm.setValue(data);
            }, err => {
                console.log("getClientAcctkeyData() err: " + JSON.stringify(err));
            })
        }
    }

    getAccountClientData() {
        let self = this;
        let accountId = this.acctClientForm.value['accountId'];
        let clientId: string = this.acctClientForm.value['clientId'];

        let url_p = null;

        if (clientId != undefined &&
            clientId != null &&
            clientId.length > 10) {
            // "GA6TQPQRV5T6PBINT6UWCTLFFDLU5YCLQR2ZZH5WUZUX3GNTWQ5MEEKB"
            clientId = clientId.trim();
            url_p = this.commonSvrc.url_dcube + "stellar/getAccountAcctkeyByKey?acctkeyid=" + clientId;
        } else {
            if (accountId != undefined &&
                accountId != null &&
                accountId.length > 10) {
                // "d90b3b58-006e-434c-ac40-dcfcce0267b4"
                accountId = accountId.trim();
                url_p = this.commonSvrc.url_dcube + "stellar/getAccountAcctkey?acctid=" + accountId;
            }
        }

        if (url_p != null) {
            this.commonSvrc.getHttp(url_p).then(data => {
                //console.log("getAccountClientData() data: " + JSON.stringify(data));
                //console.log("getAccountClientData() data['acctkeyId']: " + data['acctkeyId']);

                self.acctClientForm.setValue(data);
            }, err => {
                console.log("getAccountClientData() err: " + JSON.stringify(err));
            })
        }
    }

    getComplianceServerInfo() {
        //let url_federation_server = "https://www.dcubedev.com:8002/federation";
        let url_stellar_toml = "http://www.dcubedev.com/.well-known/stellar.toml";
        let self = this;
        let url_p = url_stellar_toml;

        if (url_p != null) {
            let contentType = 'application/json';
            let headers = new Headers();
            headers.append('Content-Type', contentType);
            //headers.append('Content-Type', 'application/text');
            //headers.append('Content-Type', 'application/json');
            //headers.append('Origin', 'http://localhost:8080');
            var reqOptions: RequestOptionsArgs = {
                url: null,
                method: RequestMethod.Get,
                search: null,
                headers: headers,
                body: null
            };

            console.log("getComplianceServerInfo() GET url_p: " + url_p);
            self.commonSvrc.getHttp(url_p, reqOptions).then(data => {
                console.log("getComplianceServerInfo() data: " + JSON.stringify(data));
                //this.outArea = data['message'];
                //this.outArea = data['pending'];
                //this.outArea = JSON.stringify(data);
                this.outArea = <string>data;
            }, err => {
                console.log("getComplianceServerInfo() err: " + JSON.stringify(err));
            });
        }
    }

    logForm() {
        console.log("acctClientForm.dirty: " + this.acctClientForm.dirty);
        console.log("acctClientForm.valid: " + this.acctClientForm.valid);
        console.log(this.acctAcctkeyForm.value);
        console.log(this.clientAcctkeyForm.value);
        console.log(this.acctClientForm.value);
    }

}
