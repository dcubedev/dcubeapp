import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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
    asset_type?: string;
    dest_asset_code?: string;
    dest_asset_type?: string;
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
    req_data?: any;
    req_domain?: string;
};

export interface IPaymentData {
    destAddress: any;
    destTag: any;
    destamount?: number;
    destcurrency?: string;
    destasset_code?: string;
    amount?: number;
    currency?: string;
    asset_code?: string;
    exchange_rate?: number;
    exchange_fees?: number;
    ttcost?: number;
};

export interface IDestinationInfo {
    accountId: any;
    memo: any;
    memoType: any;
    extraMemo?: any;
    isValidAddress: boolean;
    needFunding: boolean;
    acceptedCurrencies: any;
    acceptedIOUs: any;
};

export interface IPrice {
    n: number;
    d: number;
}

export interface ITransaction {
    sender: any;
    sender_secret?: any;
    sender_ename?: string;
    receiver: any;
    receiver_secret?: any;
    receiver_ename?: string;
    asset_code?: string;
    asset_type?: string;
    dest_asset_code?: string;
    dest_asset_type?: string;
    amount: number;
    dest_amount?: number;
    send_max_amount?: number;
    debit: string; //account_debited
    memo: any;
    memoType: string;
    effectId: string;
    creationDate: Date;
    creationTimestamp?: Date;
    remoteContact?: string;
    selling_issuer?: string;
    buying_issuer?: string;
    sell_units?: number;
    buy_units?: number;
    offerId?: number;
    price?: IPrice;
    path?: any;
    cursor?: any;
    order?: string; // sort order
    limit?: number; // Maximum number of records to return
    opname?: string; // operation name
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
    BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT,
    MOBILE_MONEY,
    SCRATCH_CARD,
    DEBIT_CARD,
    CREDIT_CARD,
    GIFT,
    COUPON
}

// AppPlatform (appplatform)
export enum AppPlatform {
    DCUBE,
    STELLAR,
    FUNTRACKER,
    STRIPE,
    UPHOLD,
    RIPPLE,
    FIRSTCAPITAL,
    MTNMOBILE,
    ALIPAY,
    PAYPAL
}

export enum PymtChannel {
    ANCHOR,
    RETAIL,
    CREDITCARD,
    DEBITCARD,
    MOBILEMONEY
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

export interface IPlatformContext {
    pname: string;
    pkey?: IKeyPair;
    anchorUrl?: string;
    pymtUrl?: string;
    pmthds_supported?: PaymentMethod[];
}

export interface IPymtMthdContext {
    pmthd: string;
    pname?: string;
}

export interface ICurrency {
    cname: string;
    pname?: string;
    symbl?: string;
}


export interface IAppContext {
    appMode: string;
    appCurr?: string;
    appLang?: string;
    appplatform?: string;
    payMethod?: string;
    SourceOfKeys?: string;
    isMobile?: boolean;
    keys?: IKeyPair;
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
    appContext: AppContext = new AppContext(AppMode[AppMode.DEV]);
    platformContext: IPlatformContext[] = [];
    selectedPlatformContext: IPlatformContext;
    pymtmthdContext: IPymtMthdContext[] = [];
    selectedPymtmthdContext: IPymtMthdContext;
    currencyList: ICurrency[] = [];
    selectedCurrency: ICurrency;
    SourceOfKeys: string;
    isMobile: boolean = false;
    url_dcube: string = AppConstants.URL_DEV_DCUBE;
    url_scom: string = AppConstants.URL_DEV_SCOM;
    local: Storage = null;
    cfgdata: any = null;
    appplatform: string = AppPlatform[AppPlatform.STELLAR];
    appMode: string = AppMode[AppMode.DEV];
    appLang: string = AppLanguage[AppLanguage.EN];
    appCurr: string = AppCurrency[AppCurrency.XLM];
    payMethod: string = PaymentMethod[PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT];
    public commonEvents$: EventEmitter<any>;

    constructor(private platform: Platform,
        private storage: Storage,
        private translateService: TranslateService,
        private appcfg: AppConfig) {

        let self = this;
        if (this.platform.is('mobile')) {
            this.isMobile = true;
        }

        this.initPlatformContext(this);
        this.initPymtMthdContext(this);
        this.initCurrencies(this);
        this.reconfigDcubeUrl();

        // see https://www.w3.org/International/questions/qa-html-language-declarations
        //console.log('CommonService.constructor() this.platform.lang: ', this.platform.lang());
        this.platform.setLang(this.appLang.toLocaleLowerCase(), true);
        //console.log('CommonService.constructor() this.platform.lang: ', this.platform.lang());

        this.commonEvents$ = new EventEmitter();

        this.storage.ready().then(() => {
        }).catch()
            ;

        console.log('CommonService.constructor() this.local: ', this.local);
        if (null === this.local) {
            this.local = storage;
            this.local.set(APPMODE, this.appMode);  // dev, demo, prod
            this.local.set(APPLANG, this.appLang);  // en, fr
            this.local.set(APPCURR, this.appCurr);  // XLM, GHS, USD
            this.local.set(APPPLATFORM, this.appplatform);  // Stellar
            this.local.set(PAYMETHOD, this.payMethod);  // WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT
            this.local.set(SOURCEOFKEYS, this.SourceOfKeys);

            // override with configuration data
            this.appcfg.load().then(cfgdata => {
                self.cfgdata = cfgdata;

                self.local.set(APPMODE, cfgdata['AppMode']);  // dev, demo, prod
                self.local.set(APPLANG, cfgdata['AppLanguage']);  // en, fr
                self.local.set(APPCURR, cfgdata['AppCurrency']);  // XLM, GHS, USD
                self.local.set(APPPLATFORM, cfgdata['AppPlatform']);  // Stellar
                self.local.set(PAYMETHOD, cfgdata['PaymentMethod']);  // WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT
                self.local.set(SOURCEOFKEYS, cfgdata['SourceOfKeys']);

                self.setAppModeSelf(self, cfgdata['AppMode']);
                self.setAppLanguageSelf(self, cfgdata['AppLanguage']);
                self.setAppCurrencySelf(self, cfgdata['AppCurrency']);
                self.setAppPlatformSelf(self, cfgdata['AppPlatform']);
                self.setPayMethodSelf(self, cfgdata['PaymentMethod']);
                self.setSourceOfKeysSelf(self, cfgdata['SourceOfKeys']);

                self.platform.setLang(cfgdata['AppLanguage'].toLocaleLowerCase(), true);

                self.reconfigDcubeUrlSelf(self);
            })
        }
    }

    isOfType(type, obj) {
        var clas = type(obj);
        return obj !== undefined && obj !== null && clas === type;
    }

    type(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1);
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
                this.url_dcube = AppConstants.URL_DEV_DCUBE;
                this.url_scom = AppConstants.URL_DEV_SCOM;
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
    reconfigDcubeUrlSelf(self) {
        self.url_dcube = AppConstants.URL_DEMO_DCUBE;
        self.url_scom = AppConstants.URL_DEMO_SCOM;
        //console.log('reconfigDcubeUrlSelf() self.appMode: ', self.appMode);
        switch (self.appMode) {
            case AppMode[AppMode.PROD]:
                // production mode
                self.url_dcube = AppConstants.URL_LIVE_DCUBE;
                self.url_scom = AppConstants.URL_LIVE_SCOM;
                break;
            case AppMode[AppMode.DEV]:
                // development mode
                self.url_dcube = AppConstants.URL_DEV_DCUBE;
                self.url_scom = AppConstants.URL_DEV_SCOM;
                break;
            case AppMode[AppMode.TEST]:
                // demonstration/learning mode
                self.url_dcube = AppConstants.URL_TEST_DCUBE;
                self.url_scom = AppConstants.URL_TEST_SCOM;
                break;
            default:
                if (self.platform.is('mobile')) {
                    // demonstration/learning mode
                    self.url_dcube = AppConstants.URL_DEMO_DCUBE;
                    self.url_scom = AppConstants.URL_DEMO_SCOM;
                }
        }

        //console.log('reconfigDcubeUrlSelf() self.url_dcube: ', self.url_dcube);
        //console.log('reconfigDcubeUrlSelf() self.url_scom: ', self.url_scom);
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
                url_dcube = AppConstants.URL_DEV_DCUBE;
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
                url_scom = AppConstants.URL_DEV_SCOM;
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
    setAppModeSelf(self, mode: string) {
        self.appMode = mode;
        self.local.set(APPMODE, mode);  // dev, demo, prod
        self.reconfigDcubeUrl();
        self.commonEvents$.emit({
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
    setAppPlatformSelf(self, app: string) {
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
    setAppLanguageSelf(self, curlang: string) {
        self.appLang = curlang;
        self.local.set(APPLANG, curlang);  // en, fr

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        //console.log('CommonService.setAppLanguage() curlang: ', curlang);
        self.translateService.use(curlang);

        //see https://www.w3.org/International/questions/qa-html-language-declarations
        //console.log('CommonService.setAppLanguage() this.platform.lang: ', this.platform.lang());
        self.platform.setLang(curlang.toLocaleLowerCase(), true);
        //console.log('CommonService.setAppLanguage() this.platform.lang: ', this.platform.lang());

        self.commonEvents$.emit({
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
    setAppCurrencySelf(self, curr: string) {
        self.appCurr = curr;
        self.local.set(APPCURR, curr);  // XLM, USD, GHS
        self.commonEvents$.emit({
            memo: APPCURR,
            status: APPCURR_CHANGED
        });
    }

    getPayMethod() {
        let self = this;
        this.local.get(PAYMETHOD).then((value: any) => {
            self.payMethod = value;
            return this.payMethod;
        });

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
    setPayMethodSelf(self, payMethod: string) {
        self.payMethod = payMethod;
        self.local.set(PAYMETHOD, payMethod);  // 
        self.commonEvents$.emit({
            memo: PAYMETHOD,
            status: PAYMETHOD_CHANGED
        });
    }

    getSourceOfKeys() {
        let self = this;
        this.local.get(SOURCEOFKEYS).then((value: any) => {
            self.SourceOfKeys = value;
            return this.SourceOfKeys;
        });

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
    setSourceOfKeysSelf(self, source: string) {
        self.SourceOfKeys = source;
        self.local.set(SOURCEOFKEYS, source);  // dev, demo, prod

        self.commonEvents$.emit({
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

        return "";
    }

    initPaymentData(self) {
        self.paymentData = {
            destAddress: '',
            destTag: null,
            amount: 0,
            asset_code: 'XLM',
            exchange_rate: 1,
            exchange_fees: 0,
            ttcost: 0
        };
    }

    initTransaction(self, asset_code: string, amount: number, dest_amount_p?: number, send_max_amount_p?: number, dest_asset_code_p?: string, dest_asset_type_p?: string) {
        let dest_asset_code = 'GHS';
        if (undefined !== dest_asset_code_p) {
            dest_asset_code = dest_asset_code_p;
        }
        let dest_asset_type = 'credit_alphanum4';
        if (undefined !== dest_asset_type_p) {
            dest_asset_type = dest_asset_type_p;
        }
        let dest_amount = 4;
        if (undefined !== dest_amount_p) {
            dest_amount = dest_amount_p;
        }
        let send_max_amount = 100;
        if (undefined !== send_max_amount_p) {
            send_max_amount = send_max_amount_p;
        }
        let sell_units: number = 1;
        let buy_units: number = 4;
        let price = { sell_units: sell_units, buy_units: buy_units };
        self.transaction = {
            sender: 'GANKXD6D7UH7HUUMZGFZWK6NDS6TYB5GO6NIWSN36B3JPCSCE7QV3Y5N',
            sender_secret: '',
            sender_ename: '',
            receiver: 'receiver',
            receiver_secret: 'receiver',
            receiver_ename: 'receiver',
            asset_code: asset_code,
            asset_type: '',
            dest_asset_code: dest_asset_code_p,
            dest_asset_type: dest_asset_type,
            amount: amount,
            dest_amount: dest_amount,
            send_max_amount: send_max_amount,
            debit: '',
            memo: null,
            memoType: 'none',
            effectId: '',
            creationDate: null,
            creationTimestamp: null,
            remoteContact: 'remoteContact',
            selling_issuer: 'GANKXD6D7UH7HUUMZGFZWK6NDS6TYB5GO6NIWSN36B3JPCSCE7QV3Y5N',
            buying_issuer: 'GD7KZQJ2CDUOBWO67DGNJPYGKAPJXHGQE7UUCWWUCTPJLAESYP3B3QEH',
            sell_units: sell_units,
            buy_units: buy_units,
            offerId: '0',
            price: price
        }
    }

    initAccount(self) {
        self.account = {
            address: 'GD3SY2MVZNI7EVDP4ZPJ2KXUJVFZN6CFZKQ2BEEZ6TOM7Z3NL6UPJSMU',
            asset_code: this.appCurr,
            dest_asset_code: 'GHS',
            dest_asset_type: 'credit_alphanum4',
            balance: 0,
            reserve: 0,
            sequence: 0,
            transactions: [{
                effectId: null,
                asset_code: this.appCurr,
                asset_type: null,
                dest_asset_code: 'GHS',
                dest_asset_type: 'credit_alphanum4',
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
            req_type: 'name',
            req_domain: ''
        };
    }

    initAccountTransactions(self, transactions) {
        self.account = {
            address: 'GD3SY2MVZNI7EVDP4ZPJ2KXUJVFZN6CFZKQ2BEEZ6TOM7Z3NL6UPJSMU',
            asset_code: this.appCurr,
            dest_asset_code: 'GHS',
            dest_asset_type: 'credit_alphanum4',
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

    addPlatformContext(self, platformContext: IPlatformContext) {
        self.platformContext.push(platformContext);
    }
    findSelectedPlatformIndex(): number {
        return this.platformContext.indexOf(this.selectedPlatformContext);
    }

    getPlatformContextPnames(): string[] {
        let pnames: string[] = [];
        for (var i = 0; i < this.platformContext.length; i++) {
            pnames.push(this.platformContext[i].pname);
        }

        console.log('CommonService::getPlatformContextPnames() pnames.length: ', pnames.length);
        return pnames;
    }

    findPlatformContext(pname: string): IPlatformContext {
        for (var i = 0; i < this.platformContext.length; i++) {
            if (this.platformContext[i].pname === pname) {
                return this.platformContext[i];
            }
        }

        return null;
    }

    getPymtMthdContextPmthdsForPlatform(pname: any): string[] {
        //console.log('CommonService::getPymtMthdContextPmthdsForPlatform() pname: ', pname);
        let pmthds: string[] = [];
        for (let i = 0; i < this.platformContext.length; i++) {
            if (this.platformContext[i].pname === pname) {
                // clear current payment methods
                //console.log('CommonService::getPymtMthdContextPmthdsForPlatform() this.pymtmthdContext.length: ', this.pymtmthdContext.length);
                for (let i = this.pymtmthdContext.length; i > 0; i--) {
                    this.pymtmthdContext.pop();
                }
                console.log('CommonService::getPymtMthdContextPmthdsForPlatform(pop) this.pymtmthdContext.length: ', this.pymtmthdContext.length);
                //this.pymtmthdContext.splice(0, this.pymtmthdContext.length);
                //console.log('CommonService::getPymtMthdContextPmthdsForPlatform(splice) this.pymtmthdContext.length: ', this.pymtmthdContext.length);

                // get the payment method(s) for this platform
                let pymtmethds: PaymentMethod[] = this.platformContext[i].pmthds_supported;
                //console.log('CommonService::getPymtMthdContextPmthdsForPlatform() pymtmethds: ', pymtmethds);
                
                if (null !== pymtmethds) {
                    // add payment method for the selected payment platform
                    for (let j = 0; j < pymtmethds.length; j++) {
                        //let pmthd: PaymentMethod = pymtmethds[pymtmethds[i]];
                        let pmthd: string = PaymentMethod[pymtmethds[j]];
                     
                        let item: IPymtMthdContext = {
                            pmthd: pmthd,
                            pname: <string>pname
                        }
                        this.pymtmthdContext.push(item);
                        pmthds.push(pmthd);
                    }
                }
            }
        }
        
        return pmthds;
    }

    initPlatformContext(self) {
        let pc_DCUBE: IPlatformContext = {
            pname: 'DCUBE',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: 'https://www.dcubedev.com',
            pymtUrl: 'https://www.dcubedev.com',
            pmthds_supported: [
                PaymentMethod.WITHIN_PLATFORM_DIRECT,
                PaymentMethod.BETWEEN_PLATFORMS_DIRECT,
                PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT,
                PaymentMethod.WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT,
                PaymentMethod.BETWEEN_PLATFORMS_ANCHOR_ONE_ACCOUNT,
                PaymentMethod.BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT,
                PaymentMethod.MOBILE_MONEY,
                PaymentMethod.SCRATCH_CARD,
                PaymentMethod.DEBIT_CARD,
                PaymentMethod.CREDIT_CARD,
                PaymentMethod.GIFT,
                PaymentMethod.COUPON
            ]
        }
        self.platformContext.push(pc_DCUBE);

        let pc_FUNTRACKER: IPlatformContext = {
            pname: 'FUNTRACKER',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: 'https://www.funtracker.site',
            pymtUrl: 'https://www.funtracker.site',
            pmthds_supported: [
                PaymentMethod.WITHIN_PLATFORM_DIRECT,
                PaymentMethod.WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT,
                PaymentMethod.WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT
            ]
        }
        self.platformContext.push(pc_FUNTRACKER);

        let pc_MTNMOBILE: IPlatformContext = {
            pname: 'MTN MOBILE MONEY',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.MOBILE_MONEY
            ]
        }
        self.platformContext.push(pc_MTNMOBILE);

        let pc_FIRSTCAPITAL: IPlatformContext = {
            pname: 'FIRST CAPITAL',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.SCRATCH_CARD
            ]
        }
        self.platformContext.push(pc_FIRSTCAPITAL);

        let pc_STRIPE: IPlatformContext = {
            pname: 'STRIPE',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.DEBIT_CARD,
                PaymentMethod.CREDIT_CARD
            ]
        }
        self.platformContext.push(pc_STRIPE);

        let pc_UPHOLD: IPlatformContext = {
            pname: 'UPHOLD',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.DEBIT_CARD,
                PaymentMethod.CREDIT_CARD
            ]
        }
        self.platformContext.push(pc_UPHOLD);

        let pc_RIPPLE: IPlatformContext = {
            pname: 'RIPPLE',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.DEBIT_CARD,
                PaymentMethod.CREDIT_CARD
            ]
        }
        self.platformContext.push(pc_RIPPLE);

        let pc_PAYPAL: IPlatformContext = {
            pname: 'PAYPAL',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.DEBIT_CARD,
                PaymentMethod.CREDIT_CARD
            ]
        }
        self.platformContext.push(pc_PAYPAL);

        let pc_ALIPAY: IPlatformContext = {
            pname: 'ALIPAY',
            pkey: {
                address: '',
                secret: ''
            },
            anchorUrl: '',
            pymtUrl: '',
            pmthds_supported: [
                PaymentMethod.DEBIT_CARD,
                PaymentMethod.CREDIT_CARD
            ]
        }
        self.platformContext.push(pc_ALIPAY);

        console.log('CommonService::getPlatformContextPnames() self.platformContext.length: ', self.platformContext.length);
    }

    initPymtMthdContext(self) {
        let pc_WITHIN_PLATFORM_DIRECT: IPymtMthdContext = {
            pmthd: 'WITHIN_PLATFORM_DIRECT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_WITHIN_PLATFORM_DIRECT);

        let pc_BETWEEN_PLATFORMS_DIRECT: IPymtMthdContext = {
            pmthd: 'BETWEEN_PLATFORMS_DIRECT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_BETWEEN_PLATFORMS_DIRECT);

        let pc_WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT: IPymtMthdContext = {
            pmthd: 'WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_WITHIN_PLATFORM_ANCHOR_ONE_ACCOUNT);

        let pc_WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT: IPymtMthdContext = {
            pmthd: 'WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_WITHIN_PLATFORM_ANCHOR_MULTI_ACCOUNT);

        let pc_BETWEEN_PLATFORMS_ANCHOR_ONE_ACCOUNT: IPymtMthdContext = {
            pmthd: 'BETWEEN_PLATFORMS_ANCHOR_ONE_ACCOUNT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_BETWEEN_PLATFORMS_ANCHOR_ONE_ACCOUNT);

        let pc_BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT: IPymtMthdContext = {
            pmthd: 'BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_BETWEEN_PLATFORMS_ANCHOR_MULTI_ACCOUNT);

        let pc_MOBILE_MONEY: IPymtMthdContext = {
            pmthd: 'MOBILE_MONEY',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_MOBILE_MONEY);

        let pc_SCRATCH_CARD: IPymtMthdContext = {
            pmthd: 'SCRATCH_CARD',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_SCRATCH_CARD);

        let pc_DEBIT_CARD: IPymtMthdContext = {
            pmthd: 'DEBIT_CARD',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_DEBIT_CARD);

        let pc_CREDIT_CARD: IPymtMthdContext = {
            pmthd: 'CREDIT_CARD',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_CREDIT_CARD);

        let pc_GIFT: IPymtMthdContext = {
            pmthd: 'GIFT',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_GIFT);

        let pc_COUPON: IPymtMthdContext = {
            pmthd: 'COUPON',
            pname: 'DCUBE'
        }
        self.pymtmthdContext.push(pc_COUPON);
        console.log('CommonService::getPlatformContextPnames() self.pymtmthdContext.length: ', self.pymtmthdContext.length);
    }

    getPymtMthdContextPmthds(): string[] {
        let pmthd: string[] = [];
        for (var i = 0; i < this.pymtmthdContext.length; i++) {
            pmthd.push(this.pymtmthdContext[i].pmthd);
        }

        console.log('CommonService::getPymtMthdContextPnames() pmthd.length: ', pmthd.length);
        return pmthd;
    }

    initCurrencies(self) {
        let pc_ZSK: ICurrency = {
            cname: 'ZSK',
            pname: 'Dcube currency',
            symbl: 'ZSK'
        }
        self.currencyList.push(pc_ZSK);

        let pc_DDD: ICurrency = {
            cname: 'DDD',
            pname: 'Dcube currency',
            symbl: 'DDD'
        }
        self.currencyList.push(pc_DDD);

        let pc_BTC: ICurrency = {
            cname: 'BTC',
            pname: 'Bitcoin',
            symbl: 'BTC'
        }
        self.currencyList.push(pc_BTC);

        let pc_EUR: ICurrency = {
            cname: 'EUR',
            pname: 'Euro',
            symbl: 'EUR'
        }
        self.currencyList.push(pc_EUR);

        let pc_FUNT: ICurrency = {
            cname: 'FUNT',
            pname: 'Funtracker',
            symbl: 'FUNT'
        }
        self.currencyList.push(pc_FUNT);

        let pc_GBP: ICurrency = {
            cname: 'GBP',
            pname: 'Great Britain Pound',
            symbl: 'GBP'
        }
        self.currencyList.push(pc_GBP);

        let pc_GHS: ICurrency = {
            cname: 'GHS',
            pname: 'Ghana Cedi',
            symbl: 'GH¢'
        }
        self.currencyList.push(pc_GHS);

        let pc_NGN: ICurrency = {
            cname: 'NGN',
            pname: 'Nigeria Naira',
            symbl: 'NGN'
        }
        self.currencyList.push(pc_NGN);

        let pc_UGX: ICurrency = {
            cname: 'UGX',
            pname: 'Ugandan Shilling',
            symbl: 'UGX'
        }
        self.currencyList.push(pc_UGX);

        let pc_USD: ICurrency = {
            cname: 'USD',
            pname: 'US Dollar',
            symbl: 'US$'
        }
        self.currencyList.push(pc_USD);

        let pc_XLM: ICurrency = {
            cname: 'XLM',
            pname: 'Stellar Lumen',
            symbl: 'XLM'
        }
        self.currencyList.push(pc_XLM);

        let pc_XOF: ICurrency = {
            cname: 'XOF',
            pname: 'West African CFA Franc',
            symbl: 'XOF'
        }
        self.currencyList.push(pc_XOF);

        let pc_ZAR: ICurrency = {
            cname: 'ZAR',
            pname: 'Dcube currency',
            symbl: 'ZAR'
        }
        self.currencyList.push(pc_ZAR);
    }
    getCurrenciesCname(): string[] {
        let curr : string[] = [];
        for (var i = 0; i < this.currencyList.length; i++) {
            //curr.push(this.currencyList[i].cname);
            curr.push(this.currencyList[i].symbl);
        }

        console.log('CommonService::getCurrenciesCname() curr.length: ', curr.length);
        return curr;
    }
    // end of class
}

class AppContext implements IAppContext {
    constructor(public appMode, public appCurr?, public appLang?,
        public appplatform?, public payMethod?,
        public SourceOfKeys?, public isMobile?, public keys?) {
    }
}

