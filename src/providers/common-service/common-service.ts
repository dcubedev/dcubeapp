import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Platform } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

// ionic 2 imports
import { Storage } from '@ionic/storage';

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
    BETWEEN_PLATFORMS_ANCHOR_ONE_ACCOUNT,
    BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT
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
    ZSK,
    DDD,
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
export const SOURCEOFKEYS_CHANGED = 'SourceOfKeysChanged';

export const APPCURR = 'appCurr';
export const APPMODE = 'appMode';
export const APPLANG = 'appLang';
export const APPPLATFORM = 'appplatform';
export const PAYMETHOD = 'payMethod';
export const SOURCEOFKEYS = 'SourceOfKeys';

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {
    SourceOfKeys: string;
    isMobile: boolean = false;
    url_dcube: string = AppConstants.URL_DEMO_DCUBE;
    url_scom: string = AppConstants.URL_DEMO_SCOM;
    local: Storage = null;
    cfgdata: any = null;
    appplatform: string = AppPlatform[AppPlatform.STELLAR];
    appMode: string = AppMode[AppMode.DEMO];
    appLang: string = AppLanguage[AppLanguage.EN];
    appCurr: string = AppCurrency[AppCurrency.XLM];
    payMethod: string = PaymentMethod[PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT];
    public commonEvents$: EventEmitter<any>;

    constructor(private platform: Platform,
        public storage: Storage,
        public translateService: TranslateService,
        public appcfg: AppConfig) {

        let self = this;
        if (this.platform.is('mobile')) {
            this.isMobile = true;
        }
        this.reconfigDcubeUrl();

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
            this.local.set(SOURCEOFKEYS, this.SourceOfKeys);
            //console.log('CommonService.constructor() this.appCurr: ', this.appCurr);
            //console.log('CommonService.constructor() this.SourceOfKeys: ', this.SourceOfKeys);

            // override with configuration data
            this.appcfg.load().then(cfgdata => {
                this.cfgdata = cfgdata;
                this.appMode = this.cfgdata.AppMode;
                this.appLang = this.cfgdata.AppLanguage;
                this.appCurr = this.cfgdata.AppCurrency;
                this.appplatform = this.cfgdata.AppPlatform;
                this.payMethod = this.cfgdata.PaymentMethod;
                this.SourceOfKeys = this.cfgdata.SourceOfKeys;
                //console.log('CommonService.constructor(cfgdata received) this.cfgdata.SourceOfKeys: ', this.cfgdata.SourceOfKeys);
                //console.log('CommonService.constructor(cfgdata received) this.appCurr: ', this.appCurr);

                self.local.set(APPMODE, self.appMode);  // dev, demo, prod
                self.local.set(APPLANG, self.appLang);  // en, fr
                self.local.set(APPCURR, self.appCurr);  // XLM, GHS, USD
                self.local.set(APPPLATFORM, self.appplatform);  // Stellar
                self.local.set(PAYMETHOD, self.payMethod);  // WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT
                self.local.set(SOURCEOFKEYS, self.SourceOfKeys);

                self.setSourceOfKeys(self.SourceOfKeys);
                self.setAppLanguage(self.appLang);
                self.setAppPlatform(self.appplatform);
                self.setPayMethod(self.payMethod);
                self.reconfigDcubeUrl();
            })
        }
    }

    onCommonEvent(callbackObj, evtFunc) {
        this.commonEvents$.subscribe(commonevt => {
            evtFunc(callbackObj, commonevt);
        });
    }

    reconfigDcubeUrl() {
        this.url_dcube = AppConstants.URL_DEMO_DCUBE;
        this.url_scom = AppConstants.URL_DEMO_SCOM;
        switch (this.appMode) {
            case AppMode[AppMode.PROD]:
                // production mode
                this.url_dcube = AppConstants.URL_LIVE_DCUBE;
                this.url_scom = AppConstants.URL_LIVE_SCOM;
                break;
            case AppMode[AppMode.DEV]:
                // development mode
                this.url_dcube = AppConstants.URL_DEV_MOBILE_DCUBE;
                this.url_scom = AppConstants.URL_DEV_MOBILE_SCOM;
                break;
            case AppMode[AppMode.TEST]:
                // demonstration/learning mode
                this.url_dcube = AppConstants.URL_TEST_DCUBE;
                this.url_scom = AppConstants.URL_TEST_SCOM;
                break;
            default:
                if (this.platform.is('mobile')) {
                    // demonstration/learning mode
                    this.url_dcube = AppConstants.URL_DEMO_DCUBE;
                    this.url_scom = AppConstants.URL_DEMO_SCOM;
                }
        }

        //console.log('reconfigDcubeUrl() this.url_dcube: ', this.url_dcube);
        //console.log('reconfigDcubeUrl() this.url_scom: ', this.url_scom);
    }

    getDcubeUrl(appMode) {
        let url_dcube = AppConstants.URL_DEMO_DCUBE;
        switch (appMode) {
            case AppMode[AppMode.PROD]:
                // production mode
                url_dcube = AppConstants.URL_LIVE_DCUBE;
                break;
            case AppMode[AppMode.DEV]:
                // development mode
                url_dcube = AppConstants.URL_DEV_MOBILE_DCUBE;
                break;
            case AppMode[AppMode.TEST]:
                // demonstration/learning mode
                url_dcube = AppConstants.URL_TEST_DCUBE;
                break;
            default:  
                if (this.platform.is('mobile')) {
                    // demonstration/learning mode
                    url_dcube = AppConstants.URL_DEMO_DCUBE;
                }
        }

        return url_dcube;
    }

    getScomcenterUrl(appMode) {
        let url_scom = AppConstants.URL_DEMO_SCOM;
        switch (appMode) {
            case AppMode[AppMode.PROD]:
                // production mode
                url_scom = AppConstants.URL_LIVE_SCOM;
                break;
            case AppMode[AppMode.DEV]:
                // development mode
                url_scom = AppConstants.URL_DEV_MOBILE_SCOM;
                break;
            case AppMode[AppMode.TEST]:
                // demonstration/learning mode
                url_scom = AppConstants.URL_TEST_SCOM;
                break;
            default:    
                if (this.platform.is('mobile')) {
                   // demonstration/learning mode
                   url_scom = AppConstants.URL_DEMO_SCOM;
                }
        }

        return url_scom;
    }

    getAppMode() {
        let self = this;
        this.local.get(APPMODE).then((value: any) => {
            self.appMode = value;
            return this.appMode;
        });

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
        //console.log('CommonService.setAppLanguage() curlang: ', curlang);
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

    getSourceOfKeys() {
        let self = this;
        this.local.get(SOURCEOFKEYS).then((value: any) => {
            self.SourceOfKeys = value;
            //console.log('getSourceOfKeys() value: ', value);
            return this.SourceOfKeys;
        });

        //console.log('getSourceOfKeys() this.SourceOfKeys: ', this.SourceOfKeys);
        return this.SourceOfKeys;  // loadKeysFromDatabase, 
    }

    setSourceOfKeys(source: string) {
        this.SourceOfKeys = source;
        this.local.set(SOURCEOFKEYS, source);  // dev, demo, prod

        this.commonEvents$.emit({
            memo: SOURCEOFKEYS_CHANGED,
            status: source
        });
    }

    translateString(key: string): string {
        return this.translateService.instant(key);
    }

    translateStringSubscribe(key: string): string {
        console.log('CommonService::translateString() key: ', key);

        this.translateService.get(key).subscribe(value => {
            // value is our translated string
            console.log('CommonService::translateString() value: ', value);
            return value;
        })

        console.log('CommonService::translateString() value: ', "");
        return "";
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
            address: 'GD3SY2MVZNI7EVDP4ZPJ2KXUJVFZN6CFZKQ2BEEZ6TOM7Z3NL6UPJSMU',
            asset_code: this.appCurr,
            balance: 0,
            reserve: 0,
            sequence: 0,
            transactions: [{
                effectId: null,
                asset_code: this.appCurr,
                asset_type: null,
                amount: 1,
                debit: null,
                memo: 'usd_client',
                memoType: 'text',
                extra_memo: 'testing compliance',
                sender_ename: 'usd_client*dcubedev.com',
                receiver_ename: 'usd_base*dcubedev.com',
                req_type: 'name',
                creationDate: '',
                creationTimestamp: '',
                remoteContact: ''
            }],
            otherCurrencies: [],
            destaddress: 'GANKXD6D7UH7HUUMZGFZWK6NDS6TYB5GO6NIWSN36B3JPCSCE7QV3Y5N',
            destsecret: 'SDW4CSSNUXVGCT5CNG3AHJ24MRVQDHCP2WI5NTTYKX2BIPEFOEII4FD4',
            pymtamt: 1,
            trustLimitAmt: 1000,
            memo: 'usd_client',
            memo_type: 'text',
            extra_memo: 'testing compliance',
            sender_ename: 'usd_client*dcubedev.com',
            receiver_ename: 'usd_base*dcubedev.com',
            req_type: 'name'
        };
    }

    initAccountTransactions(self, transactions) {
        self.account = {
            address: 'GD3SY2MVZNI7EVDP4ZPJ2KXUJVFZN6CFZKQ2BEEZ6TOM7Z3NL6UPJSMU',
            asset_code: this.appCurr,
            balance: 0,
            reserve: 0,
            sequence: 0,
            transactions: [transactions],
            otherCurrencies: [],
            destaddress: 'GANKXD6D7UH7HUUMZGFZWK6NDS6TYB5GO6NIWSN36B3JPCSCE7QV3Y5N',
            destsecret: 'SDW4CSSNUXVGCT5CNG3AHJ24MRVQDHCP2WI5NTTYKX2BIPEFOEII4FD4',
            pymtamt: 1,
            trustLimitAmt: 1000,
            memo: 'usd_client',
            memo_type: 'text',
            extra_memo: 'testing compliance',
            sender_ename: 'usd_client*dcubedev.com',
            receiver_ename: 'usd_base*dcubedev.com',
            req_type: 'name'
        };
    }

}

