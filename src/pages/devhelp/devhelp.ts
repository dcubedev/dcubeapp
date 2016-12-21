import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'devhelp.html'
})
export class DevHelpPage {

  constructor(private navController: NavController, public menuCtrl: MenuController) {
  }

  onLink(url: string) {
      window.open(url);
  }

  toggleLeftMenu() {
      this.menuCtrl.close('right');
      this.menuCtrl.toggle('left');
  }

  toggleRightMenu() {
      this.menuCtrl.close('left');
      this.menuCtrl.toggle('right');
  }

}
