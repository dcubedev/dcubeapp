import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { IonicModule, IonicErrorHandler } from 'ionic-angular';

import { CommonService } from '../../providers/common-service/common-service';
import { AppConfig } from '../../providers/app-config/app-config';
import { AuthService } from '../../providers/common-service/auth-service';

import { CryptoJSService } from './security/cryptojs';
import { StorageService } from './storage/storage-service';
import { UserDataService } from './user/userdata';


@NgModule({
    declarations: [
    ],
    imports: [
        HttpModule,
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CommonService,
        AppConfig,
        AuthService,
        CryptoJSService,
        StorageService,
        UserDataService
    ],
    exports: [
        CryptoJSService,
        StorageService,
        UserDataService
    ]
})
export class CommonModule { }
