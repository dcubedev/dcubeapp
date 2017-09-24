import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { NavController, AlertController} from 'ionic-angular';

import { AuthService } from '../../providers/common-service/auth-service';

import { LoginPage } from '../../pages/login/login';

@Component({
    selector: 'tlogin',
    templateUrl: 'tlogin.html'
})
export class TloginBtn {
    loginForm: FormGroup;
    registerCredentials = { email: '', password: '' };

    //passing an instance of the FormBuilder to the constructor
    constructor(public navCtrl: NavController,
        public _form: FormBuilder,
        private auth: AuthService,
        private alertCtrl: AlertController) {
        //using the FormBuilder to build a form
        this.loginForm = _form.group({
            "user": ["", Validators.required],
            "pword": ["", Validators.required]
        })
    }

    //the form submit function that will console.log the results
    submit(value: any) {
        // console.log(this.registrationForm.value)
        console.log('Reactive Form Data: ');
        console.log(value);
    }

    loginBtn() {
        this.navCtrl.push(LoginPage);
    }

    public login(value: any) {
        this.registerCredentials.email = value.user;
        this.registerCredentials.password = value.pword;
        // this.showLoading();
        this.auth.login(this.registerCredentials).subscribe(allowed => {
            if (allowed) {
                //this.navCtrl.setRoot(HomePage);
                // this.showError("Access Denied");
            } else {
                //this.showError("Access Denied");
                this.displayAlert("Access Denied");
            }
        },
            error => {
                // this.showError(error);
                this.displayAlert(error);
            });


        /*  this.showLoading().then(() => { // Show the loading before making the request
    
            this.auth.login(this.registerCredentials).subscribe(allowed => { // Make the http request
    
                this.loading.dismiss().then(() => { // Hide the loading
    
                    if (allowed) {
    
                        // this.navCtrl.setRoot('Inicio');
                         this.navCtrl.setRoot(HomePage);
                    } else {
                       this.showError("Access Denied");
                    }
                });
            }, error => {
                this.loading.dismiss().then(() => { // Hide the loading
                    this.showError(error);
                });
            });
        });*/

    }

    /* showLoading() {
       this.loading = this.loadingCtrl.create({
         content: 'Please wait...',
         dismissOnPageChange: true
       });
       this.loading.present();
     }*/

    /*  showLoading(): Promise<any> { // <- Return the promise
        this.loading = this.loadingCtrl.create({
            content: 'Por favor espere...',
            dismissOnPageChange: true
        });
        return this.loading.present(); // <- Added the return keyword here
    }*/

    showError(text) {
        //this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    displayAlert(message): void {
        let headsUp = this.alertCtrl.create({
            title: '60 Capital',
            subTitle: message,
            buttons: ['Got It!']
        });
        headsUp.present();
    }
    
}