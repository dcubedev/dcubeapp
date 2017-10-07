import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms"
import { NavController, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/common-service/auth-service';

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
