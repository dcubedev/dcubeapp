import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MenuController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { CommonService } from '../providers/common-service/common-service';
import { SwitchPageService } from '../providers/common-service/switch-page-service';

// Pages that communicate with Stellar/digital currency platforms
import { AboutPage } from '../pages/about/about';
import { AppmodePage } from '../pages/appmode/appmode';
import { ContactsPage } from '../pages/contacts/contacts';
import { CurrencyPage } from '../pages/currency/currency';
import { LanguagePage } from '../pages/language/language';
import { LoginPage } from '../pages/login/login';
import { PaymethodPage } from '../pages/paymethod/paymethod';
import { PlatformPage } from '../pages/platform/platform';
import { ReceivePage } from '../pages/receive/receive';
import { RegisterPage } from '../components/register/register';
import { SendPage } from '../pages/send/send';
import { TabsPage } from '../pages/tabs/tabs';
import { TransactionsPage } from '../pages/platform/stellar/transactions/transactions';
import { HomePage } from '../pages/home/home';
import { WalletPage } from '../pages/wallet/wallet';

import { GroupTypesPage } from '../pages/grouptypes/grouptypes';
import { CreateGroupPage } from '../pages/create-group/create-group';
import { FeedbackSystemPage } from '../pages/dfbs/dfbs';
import { RecommendationSystemPage } from '../pages/drds/drds';
import { ManageGroupsPage } from '../pages/manage-group/manage-group';

// Demo, Development and Testing pages

import { DemoPage } from '../pages/platform/stellar/demo/demo';
import { OffersAndTradesPage } from '../pages/platform/stellar/trade-offers/trade-offers';

// Pages that communicate with Dcube web services
import { AccountAcctkeyFormPage } from '../pages/dev/account-acctkey-form/account-acctkey-form';
import { AccountClientFormPage } from '../pages/dev/account-client-form/account-client-form';
import { ClientVerificationForm } from '../pages/dev/client-verification-form/client-verification-form';

// Pages that communicate with SCOM micro service
import { QuickSmsFormPage } from '../pages/dev/quick-sms/quick-sms-form';
import { QuickSmsPage } from '../pages/dev/sms-person/sms-person';

import { DevHelpPage } from '../pages/dev/devhelp/devhelp';

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

    //rootPage: any = TabsPage;
    rootPage: any = WalletPage;

    // items that go on the main menu (left menu)
    footerpages: IPageObj[] = [
        { title: 'Contacts', component: ContactsPage, index: 0, icon: 'contacts', enabled: true },
        { title: 'Receive', component: ReceivePage, index: 1, icon: 'arrow-round-back', enabled: true },
        { title: 'Home', component: HomePage, index: 2, icon: 'home', enabled: true },
        { title: 'Send', component: SendPage, index: 3, icon: 'send', enabled: true },
        { title: 'Transactions', component: TransactionsPage, index: 4, icon: 'archive', enabled: true }
    ];
    
    // items that go on the main menu (right menu)
    mainpages: IPageObj[] = [
        { title: 'tabs.home', component: TabsPage, enabled: true },
        { title: 'pages.login', component: LoginPage, enabled: true },
        { title: 'pages.wallet', component: WalletPage, enabled: true },
        { title: 'pages.clientform', component: AccountClientFormPage, enabled: false },
        { title: 'pages.acctsetup', component: AccountAcctkeyFormPage, enabled: false },
        { title: 'pages.demo', component: DemoPage, enabled: false },
        { title: 'pages.offertrades', component: OffersAndTradesPage, enabled: false },
        { title: 'pages.clientverify', component: ClientVerificationForm, enabled: false },
        { title: 'pages.quicksms', component: QuickSmsFormPage, enabled: false },
        { title: 'pages.quicksmspng', component: QuickSmsPage, enabled: false }
    ];

    // items that go on the setup menu (right more/setup menu)
    setuppages: IPageObj[] = [
        { title: 'pages.appmode', component: AppmodePage, enabled: true },
        { title: 'pages.currency', component: CurrencyPage, enabled: true },
        { title: 'pages.language', component: LanguagePage, enabled: true },
        { title: 'pages.platform', component: PlatformPage, enabled: true },
        { title: 'pages.pymtmethod', component: PaymethodPage, enabled: true },
        { title: 'pages.devhelp', component: DevHelpPage, enabled: true },
        { title: 'pages.grptype', component: GroupTypesPage, enabled: true },
        { title: 'pages.creategrp', component: CreateGroupPage, enabled: true },
        { title: 'pages.managegrp', component: ManageGroupsPage, enabled: true },
        { title: 'pages.drds', component: RecommendationSystemPage, enabled: true },
        { title: 'pages.dfbs', component: FeedbackSystemPage, enabled: true },
        { title: 'pages.about', component: AboutPage, enabled: true }
    ];

    menupages: IPageObj[] = [
        { title: 'pages.login', component: LoginPage, enabled: true },
        { title: 'home', component: TabsPage, enabled: true },
        { title: 'pages.about', component: AboutPage, enabled: true },
        { title: 'pages.blankdemo', component: RegisterPage, enabled: true }
    ]

    menuCtrl: MenuController;

    constructor(public platform: Platform, menuCtrl: MenuController,
        public translateService: TranslateService,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private commonSvrc: CommonService,
        public spSvrc: SwitchPageService) {
        this.menuCtrl = menuCtrl;
        this.spSvrc.register(this);
        this.initializeApp();
    }
    
    getTranslate(key:string) {
        return this.translateService.instant(key);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            let curlang: string = this.commonSvrc.appLang.toLocaleLowerCase();

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

    openLogin() {
        this.openPage(this.menupages[0]);
    }
    openHome() {
        this.openPage(this.menupages[1]);
    }
    openAbout() {
        this.openPage(this.menupages[2]);
    }
    openRegister() {
        this.openPage(this.menupages[3]);
    }

}
