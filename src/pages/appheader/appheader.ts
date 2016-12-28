import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

/*
  Generated class for the AppheaderPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'app-header',
  templateUrl: 'appheader.html',
})
export class Appheader {

  constructor(private navCtrl: NavController, public menuCtrl: MenuController) {
  }

  toggleLeftMenu() {
      this.menuCtrl.toggle('left');
  }

  toggleRightMenu() {
      this.menuCtrl.toggle('right');
  }

}
