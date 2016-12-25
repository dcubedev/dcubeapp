import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MenuController } from 'ionic-angular';

// Pages that communicate with Stellar/digital currency platforms
import { AboutPage } from '../pages/about/about';
import { AppmodePage } from '../pages/appmode/appmode';
import { ContactsPage } from '../pages/contacts/contacts';
import { CurrencyPage } from '../pages/currency/currency';
import { DemoPage } from '../pages/demo/demo';
import { LanguagePage } from '../pages/language/language';
import { DevHelpPage } from '../pages/devhelp/devhelp';
import { PaymethodPage } from '../pages/paymethod/paymethod';
import { PlatformPage } from '../pages/platform/platform';
import { ReceivePage } from '../pages/receive/receive';
import { SendPage } from '../pages/send/send';
import { TransactionsPage } from '../pages/transactions/transactions';
import { WalletPage } from '../pages/wallet/wallet';

// Pages that communicate with Dcube web services
import { AccountAcctkeyFormPage } from '../pages/account-acctkey-form/account-acctkey-form';
import { AccountClientFormPage } from '../pages/account-client-form/account-client-form';
import { ClientVerificationForm } from '../pages/client-verification-form/client-verification-form';

// Pages that communicate with SCOM micro service
import { QuickSmsFormPage } from '../pages/quick-sms/quick-sms-form';

/*
  Author: Stephen Agyepong
*/

interface IPageObj {
    title: string;
    component: any;
    icon?: string;
    index?: number;
    enabled?: boolean;
}


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WalletPage;

  // items that go on the main menu (left menu)
  footerpages: IPageObj[] = [
      { title: 'Contacts', component: ContactsPage, index: 0, icon: 'contacts', enabled: true },
      { title: 'Receive', component: ReceivePage, index: 1, icon: 'arrow-round-back', enabled: true },
      { title: 'Wallet', component: WalletPage, index: 2, icon: 'home', enabled: true },
      { title: 'Send', component: SendPage, index: 3, icon: 'send', enabled: true },
      { title: 'Transactions', component: TransactionsPage, index: 4, icon: 'archive', enabled: true }
  ];

  // items that go on the main menu (right menu)
  mainpages: IPageObj[] = [
      { title: 'Wallet', component: WalletPage, enabled: true },
      { title: 'Client Form', component: AccountClientFormPage, enabled: true },
      { title: 'Account Client Forms', component: AccountAcctkeyFormPage, enabled: true },
      { title: 'System Demonstration', component: DemoPage, enabled: true },
      { title: 'Client Verification Form', component: ClientVerificationForm, enabled: true },
      { title: 'Quick SMS', component: QuickSmsFormPage, enabled: true }
  ];

  // items that go on the setup menu (right more menu)
  setuppages: IPageObj[] = [
      { title: 'Wallet', component: WalletPage, enabled: true },
      { title: 'Application Mode', component: AppmodePage, enabled: true },
      { title: 'Currency', component: CurrencyPage, enabled: true },
      { title: 'Language', component: LanguagePage, enabled: true },
      { title: 'Platform', component: PlatformPage, enabled: true },
      { title: 'Payment Method', component: PaymethodPage, enabled: true },
      { title: 'Ionic Developer Help', component: DevHelpPage, enabled: true },
      { title: 'About', component: AboutPage, enabled: true }
  ];

  menuCtrl: MenuController;

  constructor(public platform: Platform, menuCtrl: MenuController) {
    this.menuCtrl = menuCtrl;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: IPageObj) {
      // Reset, to root, the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      if (true == page.enabled) {
          // Display only pages that are enabled
          this.menuCtrl.close('left');
          this.menuCtrl.close('right');
          this.nav.setRoot(page.component);
      }
  }

  openPageFromFooter(f_index: number) {
      // open the Wallet page from the footer Wallet button
      this.openPage(this.footerpages[f_index]);
  }

}
