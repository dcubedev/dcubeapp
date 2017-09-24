import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {TabMenuModule, MenuModule} from 'primeng/primeng';

import { CommonService } from '../providers/common-service/common-service';
import { AppConfig } from '../providers/app-config/app-config';
import { AuthService } from '../providers/common-service/auth-service';

import { Appheader } from './appheader/appheader';
import { TacctBalances } from './acctbalances/tacctbalances';

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
        TabMenuModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CommonService,
        AppConfig, AuthService
    ],
    declarations: [
        Appheader,
        TacctBalances
    ],
    exports: [
        Appheader,
        TacctBalances
    ]
})
export class CompModule { }
