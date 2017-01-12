import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { CommonService } from '../../providers/common-service/common-service';

/*
  Generated class for the Appheader page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'app-header',
    templateUrl: 'appheader.html',
})
export class Appheader {
    @Input() ptitle: string;

    getPtitle() {
        return this.commonSvrc.translateString(this.ptitle);
    }

    constructor(private navCtrl: NavController, public menuCtrl: MenuController,
        private commonSvrc: CommonService) {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

}
