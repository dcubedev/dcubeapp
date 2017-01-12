import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MenuController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

import { CommonService } from '../providers/common-service/common-service';

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
import { TabsPage } from '../pages/tabs/tabs';
import { TransactionsPage } from '../pages/transactions/transactions';
import { WalletPage } from '../pages/wallet/wallet';

// Pages that communicate with Dcube web services
import { AccountAcctkeyFormPage } from '../pages/account-acctkey-form/account-acctkey-form';
import { AccountClientFormPage } from '../pages/account-client-form/account-client-form';
import { ClientVerificationForm } from '../pages/client-verification-form/client-verification-form';

// Pages that communicate with SCOM micro service
import { QuickSmsFormPage } from '../pages/quick-sms/quick-sms-form';
import { QuickSmsPage } from '../pages/sms-person/sms-person';

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

    rootPage: any = TabsPage;

    // items that go on the main menu (left menu)
    footerpages: IPageObj[] = [
        { title: 'Contacts', component: ContactsPage, index: 0, icon: 'contacts', enabled: true },
        { title: 'Receive', component: ReceivePage, index: 1, icon: 'arrow-round-back', enabled: true },
        { title: 'Home', component: WalletPage, index: 2, icon: 'home', enabled: true },
        { title: 'Send', component: SendPage, index: 3, icon: 'send', enabled: true },
        { title: 'Transactions', component: TransactionsPage, index: 4, icon: 'archive', enabled: true }
    ];

    // items that go on the main menu (right menu)
    mainpages: IPageObj[] = [
        { title: 'tabs.home', component: TabsPage, enabled: true },
        { title: 'pages.clientform', component: AccountClientFormPage, enabled: true },
        { title: 'pages.acctsetup', component: AccountAcctkeyFormPage, enabled: true },
        { title: 'pages.demo', component: DemoPage, enabled: true },
        { title: 'pages.clientverify', component: ClientVerificationForm, enabled: true },
        { title: 'pages.quicksms', component: QuickSmsFormPage, enabled: true },
        { title: 'pages.quicksmspng', component: QuickSmsPage, enabled: true }
    ];

    // items that go on the setup menu (right more/setup menu)
    setuppages: IPageObj[] = [
        { title: 'pages.appmode', component: AppmodePage, enabled: true },
        { title: 'pages.currency', component: CurrencyPage, enabled: true },
        { title: 'pages.language', component: LanguagePage, enabled: true },
        { title: 'pages.platform', component: PlatformPage, enabled: true },
        { title: 'pages.pymtmethod', component: PaymethodPage, enabled: true },
        { title: 'pages.devhelp', component: DevHelpPage, enabled: true },
        { title: 'common.about', component: AboutPage, enabled: true }
    ];

    menuCtrl: MenuController;

    constructor(public platform: Platform, menuCtrl: MenuController,
        public translateService: TranslateService,
        private commonSvrc: CommonService) {
        this.menuCtrl = menuCtrl;
        this.initializeApp();
    }
    
    getTranslate(key:string) {
        return this.translateService.instant(key);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();

            let curlang: string = this.commonSvrc.appLang.toLocaleLowerCase();
            console.log('MyApp.initializeApp() this.commonSvrc.appLang: ', curlang);

            // see https://www.w3.org/International/questions/qa-html-language-declarations
            this.platform.setLang(curlang, true);

            //translateService.addLangs(["en", "fr"]);
            // this language will be used as a fallback when a translation isn't found in the current language
            this.translateService.setDefaultLang(curlang);

            // the lang to use, if the lang isn't available, it will use the current loader to get them
            this.translateService.use(curlang);
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
