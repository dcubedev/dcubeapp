import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { Contacts } from '@ionic-native/contacts';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from "primeng/primeng";
import {ToolbarModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {TabMenuModule, MenuModule} from 'primeng/primeng';
import 'primeng/primeng';

import { MyApp } from './app.component';
import { AppConfig } from '../providers/app-config/app-config';
import { CommonService } from '../providers/common-service/common-service';

import { EqualValidator } from '../providers/common-service/equal-validator';
import { EmailValidator } from '../providers/common-service/email-validator';
import { Utils } from '../providers/common-service/Utils';

import { SwitchPageService } from '../providers/common-service/switch-page-service';
import { RemoteService } from '../providers/remote-service/remote-service';
import { AuthService } from '../providers/common-service/auth-service';
import { RegisterService } from '../providers/common-service/register-service';

import { StellarCommonService } from '../providers/stellar/stellar-common-service';
import { StellarRemoteService } from '../providers/stellar/stellar-remote-service';
import { CommonUtilsService } from '../providers/platform/stellar/common-utils-service';

import { KeySettingsService } from '../providers/platform/stellar/key-settings-service';
import { StellarKeySettingsService } from '../providers/stellar/stellar-key-settings-service';

import { AccountService } from '../providers/platform/stellar/account-service';
import { StellarAccountService } from '../providers/stellar/stellar-account-service';

import { TrustService } from '../providers/platform/stellar/trust-service';
import { StellarTrustlineService } from '../providers/stellar/stellar-trustline-service';

import { TradingService } from '../providers/platform/stellar/trading-service';
import { StellarTradingService } from '../providers/stellar/stellar-trading-service';

import { CommonModule } from '../components/common/common.module';
import { Appheader } from '../components/common/appheader/appheader';

import { ActionsModule } from '../actions/actions.module';
import { ThomePage } from '../actions/thome/thome';
import { Tlogin } from '../actions/tlogin/tlogin';
import { TforgotPage } from '../actions/tforgot/tforgot';
import { TregisterPage } from '../actions/tregister/tregister';
import { LoginPage } from '../actions/login/login';
import { RegisterPage } from '../actions/register/register';

// Pages that communicate with Stellar/digital currency platforms
import { AboutPage } from '../pages/about/about';
import { AppmodePage } from '../pages/appmode/appmode';
import { ContactsPage } from '../pages/contacts/contacts';
import { AddContactPage } from '../pages/contacts/add-contact/add-contact';
import { CurrencyPage } from '../pages/currency/currency';
import { LanguagePage } from '../pages/language/language';
import { PaymethodPage } from '../pages/paymethod/paymethod';
import { PlatformPage } from '../pages/platform/platform'; 
import { ReceivePage } from '../pages/receive/receive';
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

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
      MyApp,
      AboutPage,
      AccountAcctkeyFormPage,
      AccountClientFormPage,
      AppmodePage,
      ClientVerificationForm,
      ContactsPage,
      AddContactPage,
      CreateGroupPage,
      CurrencyPage,
      DemoPage,
      OffersAndTradesPage,
      DevHelpPage,
      FeedbackSystemPage,
      GroupTypesPage,
      LanguagePage,
      ManageGroupsPage,
      PaymethodPage,
      PlatformPage,
      ReceivePage,
      RecommendationSystemPage,
      SendPage,
      TabsPage,
      TransactionsPage,
      HomePage,
      WalletPage,
      QuickSmsFormPage,
      QuickSmsPage
  ],
  imports: [
      BrowserModule,
      HttpModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [Http]
          }
      }),
      IonicStorageModule.forRoot(),
      IonicModule.forRoot(MyApp),
      RouterModule.forRoot([]),
      InputTextModule, DataTableModule, ButtonModule, DialogModule,
      ToolbarModule,
      CalendarModule,
      TabMenuModule,
      MenuModule,
      ActionsModule,
      CommonModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      Appheader,
      ThomePage,
      Tlogin,
      TforgotPage,
      TregisterPage,
      LoginPage,
      RegisterPage,
      AboutPage,
      AccountAcctkeyFormPage,
      AccountClientFormPage,
      AppmodePage,
      ClientVerificationForm,
      ContactsPage,
      AddContactPage,
      CreateGroupPage,
      CurrencyPage,
      DemoPage,
      OffersAndTradesPage,
      DevHelpPage,
      FeedbackSystemPage,
      GroupTypesPage,
      HomePage,
      WalletPage,
      LanguagePage,
      ManageGroupsPage,
      PaymethodPage,
      PlatformPage,
      ReceivePage,
      RecommendationSystemPage,
      SendPage,
      TabsPage,
      TransactionsPage,
      QuickSmsFormPage,
      QuickSmsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
      RouterModule,
      StatusBar,
      SplashScreen,
      BarcodeScanner,
      SocialSharing,
      Geolocation,
      Contacts,
      AppConfig,
      CommonService,
      CommonUtilsService,
      SwitchPageService,
      EqualValidator,
      EmailValidator,
      Utils,
      AuthService,
      RegisterService,
      RemoteService,
      StellarCommonService,
      StellarRemoteService,
      KeySettingsService,
      StellarKeySettingsService,
      AccountService,
      StellarAccountService,
      TrustService,
      StellarTrustlineService,
      TradingService,
      StellarTradingService]
})
export class AppModule {}
