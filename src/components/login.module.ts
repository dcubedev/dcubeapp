import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CommonService } from '../providers/common-service/common-service';
import { AppConfig } from '../providers/app-config/app-config';
import { AuthService } from '../providers/common-service/auth-service';

import {TabMenuModule, MenuModule} from 'primeng/primeng';
import 'primeng/primeng';

import { CompModule } from '../components/comp.module';

import { ThomePage } from './home/thome';
import { TloginBtn } from './login/tlogin';
import { TforgotPage } from './forgot/tforgot';
import { RegisterPage } from './register/register';
import { TregisterPage } from './register/tregister';
import { ForgotPage } from './forgot/forgot';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
    imports: [
        IonicModule,
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),

        HttpModule,
        MenuModule,
        TabMenuModule,
        CompModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CommonService,
        AppConfig, AuthService
    ],
    declarations: [
        ThomePage,
        TloginBtn,
        TforgotPage,
        ForgotPage,
        TregisterPage,
        RegisterPage
    ],
    exports: [
        ThomePage,
        TloginBtn,
        TforgotPage,
        ForgotPage,
        TregisterPage,
        RegisterPage
    ]
})
export class LoginModule { }
