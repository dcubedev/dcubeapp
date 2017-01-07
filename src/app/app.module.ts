import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from "ng2-translate/ng2-translate";
import {InputTextModule, DataTableModule, ButtonModule, DialogModule} from "primeng/primeng";
import {ToolbarModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
//import {SplitButtonModule} from 'primeng/primeng';
import 'primeng/primeng';

import { MyApp } from './app.component';
import { Appheader } from '../pages/appheader/appheader';
import { AppConfig } from '../providers/app-config/app-config';
import { CommonService } from '../providers/common-service/common-service';
import { StellarCommonService } from '../providers/stellar-common-service/stellar-common-service';
import { StellarRemoteService } from '../providers/stellar-remote-service/stellar-remote-service';

import { KeySettingsService } from '../providers/key-settings-service/key-settings-service';
import { StellarKeySettingsService } from '../providers/stellar-key-settings-service/stellar-key-settings-service';

import { AccountService } from '../providers/account-service/account-service';
import { StellarAccountService } from '../providers/stellar-account-service/stellar-account-service';

import { TrustService } from '../providers/trust-service/trust-service';
import { StellarTrustlineService } from '../providers/stellar-trustline-service/stellar-trustline-service';

import { TradingService } from '../providers/trading-service/trading-service';
import { StellarTradingService } from '../providers/stellar-trading-service/stellar-trading-service';

// Pages that communicate with digital currency platforms (Stellar, etc)
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

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
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
      CurrencyPage,
      DemoPage,
      LanguagePage,
      DevHelpPage,
      PaymethodPage,
      PlatformPage,
      ReceivePage,
      SendPage,
      TabsPage,
      TransactionsPage,
      WalletPage,
      QuickSmsFormPage,
      QuickSmsPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
      }),
      InputTextModule, DataTableModule, ButtonModule, DialogModule,
      ToolbarModule,
      CalendarModule
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
      CurrencyPage,
      DemoPage,
      LanguagePage,
      DevHelpPage,
      PaymethodPage,
      PlatformPage,
      ReceivePage,
      SendPage,
      TabsPage,
      TransactionsPage,
      WalletPage,
      QuickSmsFormPage,
      QuickSmsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
      RouterModule,
      Storage,
      AppConfig,
      CommonService,
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
