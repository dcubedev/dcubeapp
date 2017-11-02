import { Component, OnInit  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { RegisterService } from '../../providers/common-service/register-service';
import * as Models from '../../providers/models/models';
import { Http } from '@angular/http';

import { SwitchPageService } from '../../providers/common-service/switch-page-service';

import { MenuItem } from 'primeng/primeng';

/*
 * Author: Stephen Agyepong
*/
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
    items: MenuItem[];
    /*
     getLocation() {
       this.geolocation.getCurrentPosition().then((position) => {
         this.longitude = position.coords.longitude;
         this.latitude = position.coords.latitude;
       }, (err) => {
         console.log(err);
       });
     }
   
    getIpAddress() {
       this.registerService.getIp().subscribe(data => {
         console.log('IP First Service Categories ', data);
         this.ipaddress = data.ip;
   
       });
       console.log("the IP: " + this.ipaddress);
     }
   
     getUserDetailsByClientId(userId: string) {
       this.registerService.getUserByClientId(userId).subscribe(data => {
         console.log('User Details ', data);
         this.userSearch = data;
       });
     }*/

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
        //this.getIpAddress();
    }

    userForm: FormGroup;

    latitude: number;
    longitude: number;
    ipaddress: string;
    userDetails: Models.PartialReg;
    userSearch: any;
    countries: any;
    countriesList: any;
    posts: any;
    errorMessage: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FormBuilder,
        public geolocation: Geolocation,
        public registerService: RegisterService,
        private http: Http,
        public spSvrc: SwitchPageService) {

        /*
             this.http.get('http://localhost:8080/dcube-groups/rest/mysql/getCountriesJpaMysql').map(res => res.json()).subscribe(data => {
                this.posts = data.response;
                console.log("my cpountries " + this.posts);
            });
        */


        this.userForm = fb.group({
            "uplineMobileNumber": ["", Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])],
            "mobileNumber": ["", Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])],
            "selectedCountry": ["", Validators.compose([Validators.maxLength(30), Validators.required])],
            "selectedPolicy": ["", Validators.compose([Validators.maxLength(30), Validators.required])],
            "agree": [false, Validators.compose([Validators.pattern('true'), Validators.required])],
        });

    }

    ngOnInit() {
        this.items = [

            { label: 'Login', command: (event) => { this.spSvrc.openLogin(event) } },
            { label: 'Home', command: (event) => { this.spSvrc.openHome(event) } },
            { label: 'About Us', command: (event) => { this.spSvrc.openAbout(event) } },
            { label: 'Register', command: (event) => { this.spSvrc.openRegister(event) } }
        ];
    }

    register(value: any) {

        this.userDetails = new Models.PartialReg(
            value.selectedCountry, value.selectedPolicy, value.uplineMobileNumber,
            value.mobileNumber
        );

        console.log(this.userDetails);
        // this.registerService.register(this.userDetails);
        // console.log(this.registerService.postResponse + " Reponse for saving");

        //after registration push user to loging page
        // this.navCtrl.push(LoginPage,{message:"You Have Registered SUccessfully"});

    }

    formErrors = {
        'uplineMobileNumber': [],
        'mobileNumber': [],
        'selectedCountry': [],
        'selectedPolicy': [],
    };

    validationMessages = {
        'selectedPolicy': {
            'required': 'Policy is required.',

        },
        'selectedCountry': {
            'required': 'Country is required.',

        },
        'mobileNumber': {
            'required': 'Mobile Number is required.',
            'minlength': 'Mobile Number must be at least 10 characters long.',
            'maxlength': 'Mobile Number cannot be more than 10 characters long.',
        },
        'uplineMobileNumber': {
            'required': 'Uplink Mobile Number is required.',
            'minlength': 'Uplink Mobile Number must be at least 10 characters long.',
            'maxlength': 'Uplink Mobile Number cannot be more than 10 characters long.',
        }

    }

    onValueChanged(data?: any) {

        if (!this.userForm) { return; }
        const form = this.userForm;
        for (const field in this.formErrors) {
            console.log("Error " + field);
            // clear previous error message
            this.formErrors[field] = [];
            this.userForm[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                console.log("control " + control);
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    console.log("Error " + key);
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

}
