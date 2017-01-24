import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';

import { CommonService } from '../../providers/common-service/common-service';
import { RemoteService } from '../../providers/remote-service/remote-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'account-client-form.html',
})
export class AccountClientFormPage {
    clientForm: FormGroup;

    constructor(private navCtrl: NavController,
        private menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private commonSvrc: CommonService,
        private remoteSvrc: RemoteService) {

        this.clientForm = this.formBuilder.group({
            clientId: [''],
            acctkeyId: [''],
            platformId: [this.commonSvrc.appplatform],
            clientEname: [''],
            dateOfBirth: [''],
            lname: [''],
            fname: [''],
            mname: [''],
            statusCode: [''],
            KYCLevel: [''],
            domainName: [''],
            placeOfBirth: [''],
            addressLine1: [''],
            addressLine2: [''],
            city: [''],
            countyLine1: [''],
            stateLine2: [''],
            country: [''],
            clientPixId: [''],
            clientSignId: [''],
            dateOfRegistration: [''],
            registrationBy: [''],
            authorisedBy: [''],
            username: ['']
        });
    }

    logForm() {
        console.log("acctClientForm.dirty: " + this.clientForm.dirty);
        console.log("acctClientForm.valid: " + this.clientForm.valid);
        console.log(this.clientForm.value);
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    getClientDataByClientEname() {
        let self = this;
        //let clientId = this.clientForm.value['clientId'];
        let clientEname = this.clientForm.value['clientEname'];
        let platformId: string = this.clientForm.value['platformId'];

        let url_p = null;

        if (clientEname != undefined &&
            clientEname != null &&
            clientEname.length > 10) {
            // cedi_client
            clientEname = clientEname.trim();
            url_p = this.commonSvrc.url_dcube + "platform/getClientDetailPrimByClientEname?platform=" + platformId + "&clientename=" + clientEname;
        }

        if (url_p != null) {
            this.remoteSvrc.getHttp(url_p).then(data => {
                //console.log("getClientDataByClientEname() data: " + JSON.stringify(data));
                //console.log("getClientDataByClientEname() data['acctkeyId']: " + data['acctkeyId']);

                self.clientForm.setValue(data);
            }, err => {
                console.log("getClientDataByClientEname() err: " + JSON.stringify(err));
            })
        }
    }

    getClientData() {
        let self = this;
        let clientId = this.clientForm.value['clientId'];
        let clientEname = this.clientForm.value['clientEname'];

        let url_p = null;

        if (clientId != undefined &&
            clientId != null &&
            clientId.length > 10) {
            // "d90b3b58-006e-434c-ac40-dcfcce0267b4"
            clientId = clientId.trim();
            url_p = this.commonSvrc.url_dcube + "platform/getClientDetailPrim?platform=" + this.commonSvrc.appplatform + "&clientid=" + clientId;
        } else {
            if (clientEname != undefined &&
                clientEname != null &&
                clientEname.length > 10) {
                // cedi_client
                clientEname = clientEname.trim();
                url_p = this.commonSvrc.url_dcube + "platform/getClientDetailPrimByClientEname?platform=" + this.commonSvrc.appplatform + "&clientename=" + clientEname;
            }
        }

        if (url_p != null) {
            this.remoteSvrc.getHttp(url_p).then(data => {
                //console.log("getClientData() data: " + JSON.stringify(data));
                //console.log("getClientData() data['acctkeyId']: " + data['acctkeyId']);

                self.clientForm.setValue(data);
            }, err => {
                console.log("getClientData() err: " + JSON.stringify(err));
            })
        }
    }

    createClientData() {
    }

    updateClientData() {
    }

    deleteClientData() {
    }

}
