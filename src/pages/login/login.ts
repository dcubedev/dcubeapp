import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms"
//import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { NavController, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/common-service/auth-service';
import { RegisterService } from '../../providers/common-service/register-service';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginPage {
    //passing an instance of the FormBuilder to the constructor
    constructor(public navCtrl: NavController, public _form: FormBuilder,
        private auth: AuthService, private alertCtrl: AlertController) {
    }

}
