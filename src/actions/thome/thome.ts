import { Component } from '@angular/core';

import { NavController} from 'ionic-angular';


@Component({
    selector: 'thome',
    templateUrl: 'thome.html'
})
export class ThomePage {
   
    //passing an instance of the FormBuilder to the constructor
    constructor(public navCtrl: NavController) {
    }

}
