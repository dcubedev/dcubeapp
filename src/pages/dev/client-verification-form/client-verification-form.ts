import { Component } from '@angular/core';
import { RequestMethod, Headers, RequestOptionsArgs } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MenuController, NavController } from 'ionic-angular';

import { CommonService } from '../../../providers/common-service/common-service';
import { RemoteService } from '../../../providers/remote-service/remote-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'client-verification-form.html'
})
export class ClientVerificationForm {
    outArea: string;
    clientEaddr: string = "";
    clientVerifyForm: FormGroup;

    constructor(public navCtrl: NavController,
        private menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private commonSvrc: CommonService,
        private remoteSvrc: RemoteService) {
        
        this.clientVerifyForm = this.formBuilder.group({
            clientename: [''],
            platformId: [this.commonSvrc.appplatform],
            name: this.formBuilder.group({
                lname: [''],
                fname: [''],
                mname: ['']
            }),
            address: this.formBuilder.group({
                addressLine1: [''],
                addressLine2: [''],
                city: [''],
                countyLine1: [''],
                stateLine2: [''],
                country: ['']
            }),
            date_of_birth: ['']
        });
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    fetchClientInfo() {
        let self = this;
        let url_p = null;

        if (this.clientEaddr !== undefined &&
            this.clientEaddr !== null &&
            this.clientEaddr.length > 0) {
            // cedi_client*dcube.com
            this.clientEaddr = this.clientEaddr.trim();
            url_p = this.commonSvrc.url_dcube + "compliance/fetch_info?address=" + this.clientEaddr;
        }

        if (url_p != null) {
            this.remoteSvrc.getHttp(url_p).then(data => {
                (self.clientVerifyForm.controls['clientename'] as FormControl).setValue(data['clientename']);

                (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['lname']).setValue(data['name']['lname']);
                (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['fname']).setValue(data['name']['fname']);
                let mname: any = data['name']['mname'];
                if (undefined !== mname) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['mname']).setValue(mname);
                }

                //set values for address formGroup
                let addressLine1: any = data['address']['addressLine1'];
                if (undefined !== addressLine1) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['addressLine1']).setValue(addressLine1);
                }
                let addressLine2: any = data['address']['addressLine2'];
                if (undefined !== addressLine2) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['addressLine2']).setValue(addressLine2);
                }
                let city: any = data['address']['city'];
                if (undefined !== city) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['city']).setValue(city);
                }
                let countyLine1: any = data['address']['countyLine1'];
                if (undefined !== countyLine1) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['countyLine1']).setValue(countyLine1);
                }
                let stateLine2: any = data['address']['stateLine2'];
                if (undefined !== stateLine2) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['stateLine2']).setValue(stateLine2);
                }
                let country: any = data['address']['country'];
                if (undefined !== country) {
                    (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['country']).setValue(country);
                }

                (self.clientVerifyForm.controls['date_of_birth'] as FormControl).setValue(data['date_of_birth']);
            }, err => {
                console.log("fetchClientInfo() err: " + JSON.stringify(err));
            })
        }
    }

    verifyClientSanctionStatus() {
        let self = this;
        let url_p = null;
        let body_p = {};

        let clientEname = self.clientVerifyForm.controls['clientename'].value;
        //let platformId: string = this.clientVerifyForm.value['platformId'];

        let lname = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['lname']).value;
        let fname = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['fname']).value;
        let mname = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['mname']).value;

        let addressLine1 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['addressLine1']).value;
        let addressLine2 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['addressLine2']).value;
        let city = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['city']).value;
        let countyLine1 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['countyLine1']).value;
        let stateLine2 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['stateLine2']).value;
        let country = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['country']).value;

        let date_of_birth = self.clientVerifyForm.controls['date_of_birth'].value;

        if (clientEname !== undefined &&
            clientEname !== null &&
            clientEname.length > 0) {
            clientEname = clientEname.trim();
            body_p['clientename'] = clientEname;
            url_p = this.commonSvrc.url_dcube + "compliance/sanctions";
        }

        if (url_p != null) {
            body_p['name'] = {};
            if ((undefined != lname) && (null != lname) && (lname.length > 0)) {
                body_p['name']['lname'] = lname;
            }
            if ((undefined != fname) && (null != fname) && (fname.length > 0)) {
                body_p['name']['fname'] = fname;
            }
            if ((undefined != mname) && (null != mname) && (mname.length > 0)) {
                body_p['name']['mname'] = mname;
            }

            body_p['address'] = {};
            if ((undefined != addressLine1) && (null != addressLine1) && (addressLine1.length > 0)) {
                body_p['address']['addressLine1'] = addressLine1;
            }
            if ((undefined !== addressLine2) && (null != addressLine2) && (addressLine2.length > 0)) {
                body_p['address']['addressLine2'] = addressLine2;
            }
            if ((undefined != city) && (null != city) && (city.length > 0)) {
                body_p['address']['city'] = city;
            }
            if ((undefined != countyLine1) && (null != countyLine1) && (countyLine1.length > 0)) {
                body_p['address']['countyLine1'] = countyLine1;
            }
            if ((undefined !== stateLine2) && (null != stateLine2) && (stateLine2.length > 0)) {
                body_p['address']['stateLine2'] = stateLine2;
            }
            if ((undefined != country) && (null != country) && (country.length > 0)) {
                body_p['address']['country'] = country;
            }

            if ((undefined !== date_of_birth) && (null != date_of_birth) && ("" != date_of_birth)) {
                body_p['date_of_birth'] = date_of_birth;
            }

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

            console.log("verifyClientSanctionStatus() sending POST body_p: " + body_p);
            self.remoteSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
                console.log("verifyClientSanctionStatus() data: " + JSON.stringify(data));
                //this.outArea = data['message'];
                //this.outArea = data['pending'];
                this.outArea = JSON.stringify(data);
            }, err => {
                console.log("verifyClientSanctionStatus() err: " + JSON.stringify(err));
            });
        }
    }

    canShareClientInfo() {
        let self = this;
        let url_p = null;
        let body_p = {};

        let clientEname = self.clientVerifyForm.controls['clientename'].value;

        let lname = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['lname']).value;
        let fname = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['fname']).value;
        let mname = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['name']).controls['mname']).value;

        let addressLine1 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['addressLine1']).value;
        let addressLine2 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['addressLine2']).value;
        let city = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['city']).value;
        let countyLine1 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['countyLine1']).value;
        let stateLine2 = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['stateLine2']).value;
        let country = (<FormControl>(<FormGroup>self.clientVerifyForm.controls['address']).controls['country']).value;

        let date_of_birth = self.clientVerifyForm.controls['date_of_birth'].value;

        if (clientEname !== undefined &&
            clientEname !== null &&
            clientEname.length > 0) {
            clientEname = clientEname.trim();
            body_p['clientename'] = clientEname;
            url_p = this.commonSvrc.url_dcube + "compliance/ask_user";
        }

        if (url_p != null) {
            body_p['name'] = {};
            if ((undefined != lname) && (null != lname) && (lname.length > 0)) {
                body_p['name']['lname'] = lname;
            }
            if ((undefined != fname) && (null != fname) && (fname.length > 0)) {
                body_p['name']['fname'] = fname;
            }
            if ((undefined != mname) && (null != mname) && (mname.length > 0)) {
                body_p['name']['mname'] = mname;
            }

            body_p['address'] = {};
            if ((undefined != addressLine1) && (null != addressLine1) && (addressLine1.length > 0)) {
                body_p['address']['addressLine1'] = addressLine1;
            }
            if ((undefined !== addressLine2) && (null != addressLine2) && (addressLine2.length > 0)) {
                body_p['address']['addressLine2'] = addressLine2;
            }
            if ((undefined != city) && (null != city) && (city.length > 0)) {
                body_p['address']['city'] = city;
            }
            if ((undefined != countyLine1) && (null != countyLine1) && (countyLine1.length > 0)) {
                body_p['address']['countyLine1'] = countyLine1;
            }
            if ((undefined !== stateLine2) && (null != stateLine2) && (stateLine2.length > 0)) {
                body_p['address']['stateLine2'] = stateLine2;
            }
            if ((undefined != country) && (null != country) && (country.length > 0)) {
                body_p['address']['country'] = country;
            }

            if ((undefined !== date_of_birth) && (null != date_of_birth) && ("" != date_of_birth)) {
                body_p['date_of_birth'] = date_of_birth;
            }

            let contentType = 'application/json';
            let headers = new Headers();
            headers.append('Content-Type', contentType);
            //headers.append('Content-Type', 'application/text');
            //headers.append('Content-Type', 'application/json');
            //headers.append('Origin', 'http://localhost:8080');
            var reqOptions: RequestOptionsArgs = {
                url: null,
                method: RequestMethod.Post,
                search: null,
                headers: headers,
                body: null
            };

            console.log("canShareClientInfo() sending POST body_p: " + body_p);
            self.remoteSvrc.postHttp(url_p, body_p, reqOptions).then(data => {
                console.log("canShareClientInfo() data: " + JSON.stringify(data));
                this.outArea = JSON.stringify(data);
            }, err => {
                console.log("canShareClientInfo() err: " + JSON.stringify(err));
            });
        }
    }

}