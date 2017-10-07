import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { IonicModule, IonicErrorHandler } from 'ionic-angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {TabMenuModule, MenuModule} from 'primeng/primeng';

import { CommonService } from '../providers/common-service/common-service';
import { AppConfig } from '../providers/app-config/app-config';
import { AuthService } from '../providers/common-service/auth-service';

import { CommonModule } from '../components/common/common.module';
import { CryptoJSService } from '../components/services/security/cryptojs';
import { Appheader } from '../components/common/appheader/appheader';

import { ThomePage } from './thome/thome';
import { Tlogin } from './tlogin/tlogin';
import { TforgotPage } from './tforgot/tforgot';
import { TregisterPage } from './tregister/tregister';

import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';
import { ForgotPage } from './forgot/forgot';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        ThomePage,
        Tlogin,
        TforgotPage,
        TregisterPage,
        LoginPage, ForgotPage, RegisterPage
    ],
    imports: [
        IonicModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),

        HttpModule,
        CommonModule,
        MenuModule,
        TabMenuModule
    ],
    entryComponents: [
        Appheader,
        ThomePage,
        Tlogin,
        TforgotPage,
        TregisterPage,
        LoginPage, ForgotPage, RegisterPage
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CommonService,
        AppConfig,
        AuthService,
        CryptoJSService
    ],
    exports: [
        ThomePage,
        Tlogin,
        TforgotPage,
        TregisterPage,
        LoginPage, ForgotPage, RegisterPage
    ]
})
export class ActionsModule { }
