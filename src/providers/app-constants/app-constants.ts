import { Injectable } from '@angular/core';

export const CREATE_ACCT = 'create_account';
export const ACCT_CREATED = 'account_created';
export const ACCT_DEBITED = 'account_debited';
export const ACCT_CREDITED = 'account_credited';
export const ACCT_INFO_LOADED = 'accountInfoLoaded';
export const NEW_TRANSACT = 'newTransaction';
export const NEW_PAYMENT = 'newPayment';
export const MEMO_ACCT = 'account';

//export const URL_LIVE_DCUBE = 'http://localhost:8880/dcube-service/';
//export const URL_DEV_DCUBE = URL_LIVE_DCUBE;
//export const URL_DEV_MOBILE_DCUBE = URL_LIVE_DCUBE;
//export const URL_DEMO_DCUBE = URL_LIVE_DCUBE;
//export const URL_TEST_DCUBE = URL_LIVE_DCUBE;

//export const URL_LIVE_SCOM = 'http://localhost:8880/scom-service/';
//export const URL_DEV_SCOM = URL_LIVE_SCOM;
//export const URL_DEV_MOBILE_SCOM = URL_LIVE_SCOM;
//export const URL_DEMO_SCOM = URL_LIVE_SCOM;
//export const URL_TEST_SCOM = URL_LIVE_SCOM;

export const URL_LIVE_DCUBE = 'http://dcubedev.com/dcube-service/';
export const URL_DEV_DCUBE = 'http://localhost:8880/dcube-service/';
export const URL_DEV_MOBILE_DCUBE = 'http://dcubedev.com/dcube-service/';
export const URL_DEMO_DCUBE = 'http://demo.dcubedev.com/dcube-service/';
export const URL_TEST_DCUBE = 'http://test.dcubedev.com/dcube-service/';

export const URL_LIVE_SCOM = 'http://dcubedev.com/scom-service/';
export const URL_DEV_SCOM = 'http://localhost:8880/scom-service/';
export const URL_DEV_MOBILE_SCOM = 'http://dcubedev.com/scom-service/';
export const URL_DEMO_SCOM = 'http://demo.dcubedev.com/scom-service/';
export const URL_TEST_SCOM = 'http://test.dcubedev.com/scom-service/';

/*
  Author: Stephen Agyepong
*/

@Injectable()
export class AppConstants {

    constructor() { }

}

