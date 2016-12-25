import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';

import { Platform } from 'ionic-angular';

// ionic 2 imports
import { Storage } from '@ionic/storage';
import {TranslateService} from 'ng2-translate';

// dcubedev imports
import * as AppConstants from '../app-constants/app-constants';
import { AppConfig } from '../app-config/app-config';

/*
  Author: Stephen Agyepong
*/

export interface IRadioGroupItem {
    label: string;
    checked: string;
    value: string;
}

export interface IAcctStatus {
    account: string;
    status: string; //created, loaded
};

export interface IKeyPair {
    address: any;
    secret: any;
};

export interface IWalletKey {
    address: any;
    secret: any;
    mode?: string; //created, loaded
};

export interface IAccountBalance {
    asset_code: string;
    balance: number;
}

export interface IAccountBase {
    address: any;
    asset_code: string;
    balance: number;
    reserve: number;
    sequence: number;
    transactions: any[];
    destaddress?: any;
    destsecret?: any;
    pymtamt?: number;
    trustLimitAmt?: number;
    memo?: string;
};

export interface IAccount {
    address: any;
    asset_code?: string;
    balance: number;
    reserve: number;
    sequence: number;
    transactions: any[];
    otherCurrencies: any[];
    destaddress?: any;
    destsecret?: any;
    pymtamt?: number;
    trustLimitAmt?: number;
    sender_ename?: string;
    receiver_ename?: string;
    memo?: string;
    memo_type?: string;
    extra_memo?: string;
    req_type?: string;
};

export interface IPaymentData {
    destAddress: any;
    destTag: any;
    amount: number;
    asset_code: string;
};

export interface IDestinationInfo {
    accountId: any;
    memo: any;
    memoType: any;
    isValidAddress: boolean;
    needFunding: boolean;
    acceptedCurrencies: any;
    acceptedIOUs: any;
};

export interface ITransaction {
    effectId: string;
    asset_code?: string;
    asset_type?: string;
    amount: number;
    debit: string; //account_debited
    sender: string;
    receiver: string;
    memo: any;
    memoType: string;
    creationDate: Date;
    creationTimestamp?: Date;
    remoteContact?: string;
};

export interface ITransactionContext {
    isDirty: boolean,
    isValidCurrency: boolean,
    alternatives: any[],
    choice: any[],
    amount: number
};

export enum Permission {
    ALLOWED,
    PENDING,
    DENIED,
    UNKNOWN
}

export enum KYCLevel {
    NOTVERIFIED,
    EMAIL,
    DATEOFBIRTH,
    SELFPHOTOID,
    SELFPHOTOIDNOTARIZED,
    FINGERPRINTVERIFIED
}

export enum PaymentMethod {
    WITHIN_PLATFORM_DIRECT,
    BETWEEN_PLATFORMS_DIRECT,
    WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT,
    WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT,
    BETWEEN_PLATFORMS_ANCHOR
}

// AppPlatform (appplatform)
export enum AppPlatform {
    STELLAR,
    UPHOLD,
    RIPPLE
}

export enum AppMode {
    DEMO,
    DEV,
    PROD,
    TEST
}

export enum AppCurrency {
    BTC,
    EUR,
    FUNT,
    GBP,
    GHS,
    NGN,
    UGX,
    USD,
    XLM,
    XOF,
    ZAR
}

export enum AppLanguage {
    EN,
    FR,
    AK,
    DE,
    NL
}

export const APPCURR_CHANGED = 'currencyChanged';
export const APPMODE_CHANGED = 'appmodeChanged';
export const APPLANG_CHANGED = 'appLangChanged';
export const APPPLATFORM_CHANGED = 'appplatformChanged';
export const PAYMETHOD_CHANGED = 'paymethodChanged';

export const APPCURR = 'appCurr';
export const APPMODE = 'appMode';
export const APPLANG = 'appLang';
export const APPPLATFORM = 'appplatform';
export const PAYMETHOD = 'payMethod';

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {
    isMobile: boolean = false;
    url_dcube: string = AppConstants.URL_DEV_DCUBE;
    url_scom: string = AppConstants.URL_DEV_SCOM;
    local: Storage = null;
    _data: any = null;
    cfgdata: any = null;
    appplatform: string = AppPlatform[AppPlatform.STELLAR];
    appMode: string = AppMode[AppMode.DEV];
    appLang: string = AppLanguage[AppLanguage.EN];
    appCurr: string = AppCurrency[AppCurrency.XLM];
    payMethod: string = PaymentMethod[PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT];
    public commonEvents$: EventEmitter<any>;

    constructor(public http: Http,
        private platform: Platform,
        public storage: Storage,
        public translateService: TranslateService,
        public appcfg: AppConfig) {

        if (this.platform.is('mobile')) {
            this.isMobile = true;
        }
        this.reconfigDcubeUrl();
        
        // this language will be used as a fallback when a translation isn't found in the current language
        translateService.setDefaultLang(this.appLang);

        // see https://www.w3.org/International/questions/qa-html-language-declarations
        //console.log('CommonService.constructor() this.platform.lang: ', this.platform.lang());
        this.platform.setLang(this.appLang.toLocaleLowerCase(), true);
        //console.log('CommonService.constructor() this.platform.lang: ', this.platform.lang());

        this.commonEvents$ = new EventEmitter();
        if (null === this.local) {
            this.local = storage;
            this.local.set(APPMODE, this.appMode);  // dev, demo, prod
            this.local.set(APPLANG, this.appLang);  // en, fr
            this.local.set(APPCURR, this.appCurr);  // XLM, GHS, USD
            this.local.set(APPPLATFORM, this.appplatform);  // Stellar
            this.local.set(PAYMETHOD, this.payMethod);  // WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT
            //console.log('CommonService.constructor() this.appCurr: ', this.appCurr);

            // override with configuration data
            this.appcfg.load().then(cfgdata => {
                this.cfgdata = cfgdata;
                this.appMode = this.cfgdata.AppMode;
                this.appLang = this.cfgdata.AppLanguage;
                this.appCurr = this.cfgdata.AppCurrency;
                this.appplatform = this.cfgdata.AppPlatform;
                this.payMethod = this.cfgdata.PaymentMethod;
                //console.log('CommonService.constructor(cfgdata received) this.appCurr: ', this.appCurr);

                this.local.set(APPMODE, this.appMode);  // dev, demo, prod
                this.local.set(APPLANG, this.appLang);  // en, fr
                this.local.set(APPCURR, this.appCurr);  // XLM, GHS, USD
                this.local.set(APPPLATFORM, this.appplatform);  // Stellar
                this.local.set('payMethod', this.payMethod);  // WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT

                this.reconfigDcubeUrl();
                this.commonEvents$.emit({
                    memo: APPCURR,
                    status: APPCURR_CHANGED
                });
            })
        }
    }

    reconfigDcubeUrl() {
        //console.log('reconfigDcubeUrl() this.appMode: ', this.appMode);
        this.url_dcube = AppConstants.URL_DEV_DCUBE;
        this.url_scom = AppConstants.URL_DEV_SCOM;
        switch (this.appMode) {
            case AppMode[AppMode.PROD]:
                // production mode
            this.url_dcube = AppConstants.URL_LIVE_DCUBE;
            this.url_scom = AppConstants.URL_LIVE_SCOM;
                break;
            case AppMode[AppMode.DEMO]:
                // demonstration/learning mode
                this.url_dcube = AppConstants.URL_DEMO_DCUBE;
                this.url_scom = AppConstants.URL_DEMO_SCOM;
                break;
            case AppMode[AppMode.TEST]:
                // demonstration/learning mode
                this.url_dcube = AppConstants.URL_TEST_DCUBE;
                this.url_scom = AppConstants.URL_TEST_SCOM;
                break;
            default:
                // development mode
                if (this.platform.is('mobile')) {
                    this.url_dcube = AppConstants.URL_DEV_MOBILE_DCUBE;
                    this.url_scom = AppConstants.URL_DEV_MOBILE_SCOM;
                }
        }
    }

    getAppMode() {
        let self = this;
        this.local.get(APPMODE).then((value: any) => {
            self.appMode = value;
            //console.log('getAppMode() value: ', value);
            return this.appMode;
        });

        //console.log('getAppMode() this.appMode: ', this.appMode);
        return this.appMode;  // dev, demo, prod
    }

    setAppMode(mode: string) {
        this.appMode = mode;
        this.local.set(APPMODE, mode);  // dev, demo, prod
        this.reconfigDcubeUrl();
        this.commonEvents$.emit({
            memo: APPMODE,
            status: APPMODE_CHANGED
        });
    }

    getAppPlatform() {
        let self = this;
        this.local.get(APPPLATFORM).then((value: any) => {
            self.appplatform = value;
            //console.log('getAppPlatform() value: ', value);
            return this.appplatform;
        });

        //console.log('getAppPlatform() this.appplatform: ', this.appplatform);
        return this.appplatform;  // Stellar
    }

    setAppPlatform(app: string) {
        this.appplatform = app;
        this.local.set(APPPLATFORM, app);  // Stellar

        this.commonEvents$.emit({
            memo: APPPLATFORM,
            status: APPPLATFORM_CHANGED
        });
    }

    getAppLanguage() {
        let self = this;
        this.local.get(APPLANG).then((value: any) => {
            self.appLang = value;
            //console.log('getAppLanguage() value: ', value);
            return this.appLang;
        });

        //console.log('getAppLanguage() this.appLang: ', this.appLang);
        return this.appLang;  // en, fr
    }

    setAppLanguage(curlang: string) {
        this.appLang = curlang;
        this.local.set(APPLANG, curlang);  // en, fr

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translateService.use(curlang);

        //see https://www.w3.org/International/questions/qa-html-language-declarations
        //console.log('CommonService.setAppLanguage() this.platform.lang: ', this.platform.lang());
        this.platform.setLang(curlang.toLocaleLowerCase(), true);
        //console.log('CommonService.setAppLanguage() this.platform.lang: ', this.platform.lang());

        this.commonEvents$.emit({
            memo: APPLANG,
            status: APPLANG_CHANGED
        });
    }

    translateString(key: string): string {
        this.translateService.get(key).subscribe(
            value => {
                // value is our translated string
                return value;
            }
        )

        return key;
    }

    getAppCurrency() {
        let self = this;
        this.local.get(APPCURR).then((value: any) => {
            self.appCurr = value;
            //console.log('getAppCurrency() value: ', value);
            return this.appCurr;
        });

        //console.log('getAppCurrency() this.appCurr: ', this.appCurr);
        return this.appCurr;  // XLM, USD, GHS
    }

    setAppCurrency(curr: string) {
        this.appCurr = curr;
        this.local.set(APPCURR, curr);  // XLM, USD, GHS
        this.commonEvents$.emit({
            memo: APPCURR,
            status: APPCURR_CHANGED
        });
    }

    getPayMethod() {
        let self = this;
        this.local.get(PAYMETHOD).then((value: any) => {
            self.payMethod = value;
            //console.log('getPayMethod() value: ', value);
            return this.payMethod;
        });

        //console.log('getPayMethod() this.payMethod: ', this.payMethod);
        return this.payMethod;  // WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT,etc
    }

    setPayMethod(payMethod: string) {
        this.payMethod = payMethod;
        this.local.set(PAYMETHOD, payMethod);  // 
        this.commonEvents$.emit({
            memo: PAYMETHOD,
            status: PAYMETHOD_CHANGED
        });
    }

    initAccountTransaction(self, asset_type: string, amount: number) {
        self.account = {
            effectId: '',
            asset_type: asset_type,
            amount: amount,
            debit: '',
            sender: 'sender',
            receiver: 'receiver',
            memo: null,
            memoType: 'none',
            creationDate: null,
            creationTimestamp: null,
            remoteContact: 'remoteContact'
        }
    }

    initAccount(self) {
        self.account = {
            address: null,
            asset_code: this.appCurr,
            balance: 0,
            reserve: 0,
            sequence: 0,
            transactions: [{
                effectId: null,
                asset_code: this.appCurr,
                asset_type: null,
                amount: 0,
                debit: null,
                memo: 'usd_client',
                memoType: 'text',
                extra_memo: 'usd_client',
                sender_ename: 'usd_issuer*dcube.com',
                receiver_ename: 'usd_base*dcube.com',
                req_type: 'name',
                creationDate: '',
                creationTimestamp: '',
                remoteContact: ''
            }],
            otherCurrencies: [],
            destaddress: 'GCS3V3RII7LOCAKMZV4MBBZJFO6HQSN7DJPQGQQKLKIBBRPOXN6FTTIN',
            destsecret: 'SDIUALDWTBDUU42AJ7TM3PUELOWIYGRIYYDVXLFW5MIJHPG23VIYLEAZ',
            pymtamt: 0,
            trustLimitAmt: 100,
            memo: 'usd_client',
            memo_type: 'text',
            extra_memo: 'usd_client',
            sender_ename: 'usd_issuer*dcube.com',
            receiver_ename: 'usd_base*dcube.com',
            req_type: 'name'
        };
    }

    initAccountTransactions(self, transactions) {
        self.account = {
            address: null,
            asset_code: this.appCurr,
            balance: 0,
            reserve: 0,
            sequence: 0,
            transactions: [transactions],
            otherCurrencies: [],
            destaddress: 'GCS3V3RII7LOCAKMZV4MBBZJFO6HQSN7DJPQGQQKLKIBBRPOXN6FTTIN',
            destsecret: 'SDIUALDWTBDUU42AJ7TM3PUELOWIYGRIYYDVXLFW5MIJHPG23VIYLEAZ',
            pymtamt: 0,
            trustLimitAmt: 100,
            memo: 'usd_client',
            memo_type: 'text',
            extra_memo: 'usd_client',
            sender_ename: 'usd_issuer*dcube.com',
            receiver_ename: 'usd_base*dcube.com',
            req_type: 'name'
        };
    }

    getHttp(url_p: string, options?: RequestOptionsArgs) {
        return new Promise((resolve, reject) => {
            let self = this;
            this.http.get(url_p, options)
                .subscribe(_data => {
                    self._data = _data;
                    //console.log('getHttp() this._data: ' + JSON.stringify(this._data));
                    //console.log('getHttp() _data.status: ' + JSON.stringify(_data.status));
                    //console.log('getHttp() _data.headers: ' + JSON.stringify(_data.headers));
                    //console.log('getHttp() _data.json(): ' + JSON.stringify(_data.json()));
                    resolve(_data.json());
                },
                onerr => {
                    console.error('getHttp() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                },
                () => {
                    //console.log('getHttp() completed');
                });
        });
    }

    postHttp(url_p: string, body_p: any, options?: RequestOptionsArgs) {
        return new Promise((resolve, reject) => {
            let self = this;
            this.http.post(url_p, body_p, options)
                .subscribe(_data => {
                    self._data = _data;
                    console.log('postHttp() _data.status: ' + JSON.stringify(_data.status));
                    console.log('postHttp() _data.headers: ' + JSON.stringify(_data.headers));
                    console.log('postHttp() this._data: ' + JSON.stringify(this._data));
                    console.log('postHttp() _data.json(): ' + JSON.stringify(_data.json()));
                    resolve(_data.json());
                },
                onerr => {
                    console.error('postHttp() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                },
                () => { console.log('postHttp() completed') });
        });
    }

}

