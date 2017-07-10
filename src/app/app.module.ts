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
//import 'rxjs/Rx';

//import { TranslateModule, TranslateStaticLoader, TranslateLoader } from "ng2-translate/ng2-translate";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from "primeng/primeng";
import {ToolbarModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {TabMenuModule, MenuModule} from 'primeng/primeng';
import 'primeng/primeng';

import { MyApp } from './app.component';
import { Appheader } from '../pages/appheader/appheader';
import { AppConfig } from '../providers/app-config/app-config';
import { CommonService } from '../providers/common-service/common-service';
import { RemoteService } from '../providers/remote-service/remote-service';

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

// Pages that communicate with digital currency platforms (Stellar, etc)
import { AboutPage } from '../pages/about/about';
import { AppmodePage } from '../pages/appmode/appmode';
import { ContactsPage } from '../pages/contacts/contacts';
import { CurrencyPage } from '../pages/currency/currency';
import { DemoPage } from '../pages/platform/stellar/demo/demo';
import { OffersAndTradesPage } from '../pages/platform/stellar/trade-offers/trade-offers';
import { LanguagePage } from '../pages/language/language';
import { DevHelpPage } from '../pages/devhelp/devhelp';
import { PaymethodPage } from '../pages/paymethod/paymethod';
import { PlatformPage } from '../pages/platform/platform';
import { ReceivePage } from '../pages/receive/receive';
import { SendPage } from '../pages/send/send';
import { TabsPage } from '../pages/tabs/tabs';
import { TransactionsPage } from '../pages/platform/stellar/transactions/transactions';
import { WalletPage } from '../pages/wallet/wallet';
import { HomePage } from '../pages/home/home';

import { GroupTypesPage } from '../pages/grouptypes/grouptypes';
import { CreateGroupPage } from '../pages/create-group/create-group';
import { FeedbackSystemPage } from '../pages/dfbs/dfbs';
import { RecommendationSystemPage } from '../pages/drds/drds';
import { ManageGroupsPage } from '../pages/manage-group/manage-group';

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

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
      MyApp,
      Appheader,
      AboutPage,
      AccountAcctkeyFormPage,
      AccountClientFormPage,
      AppmodePage,
      ClientVerificationForm,
      ContactsPage,
      CreateGroupPage,
      CurrencyPage,
      DemoPage,
      OffersAndTradesPage,
      DevHelpPage,
      FeedbackSystemPage,
      GroupTypesPage,
      HomePage,
      LanguagePage,
      ManageGroupsPage,
      PaymethodPage,
      PlatformPage,
      ReceivePage,
      RecommendationSystemPage,
      SendPage,
      TabsPage,
      TransactionsPage,
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
      MenuModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      Appheader,
      AboutPage,
      AccountAcctkeyFormPage,
      AccountClientFormPage,
      AppmodePage,
      ClientVerificationForm,
      ContactsPage,
      CreateGroupPage,
      CurrencyPage,
      DemoPage,
      OffersAndTradesPage,
      DevHelpPage,
      FeedbackSystemPage,
      GroupTypesPage,
      HomePage,
      LanguagePage,
      ManageGroupsPage,
      PaymethodPage,
      PlatformPage,
      ReceivePage,
      RecommendationSystemPage,
      SendPage,
      TabsPage,
      TransactionsPage,
      WalletPage,
      QuickSmsFormPage,
      QuickSmsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
      RouterModule,
      StatusBar,
      SplashScreen,
      BarcodeScanner,
      SocialSharing,
      AppConfig,
      CommonService,
      CommonUtilsService,
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
