import { Injectable } from '@angular/core';

export const CREATE_ACCT = 'create_account';
export const ACCT_CREATED = 'account_created';
export const ACCT_DEBITED = 'account_debited';
export const ACCT_CREDITED = 'account_credited';
export const ACCT_INFO_LOADED = 'accountInfoLoaded';
export const NEW_TRANSACT = 'newTransaction';
export const NEW_PAYMENT = 'newPayment';
export const MEMO_ACCT = 'account';

export const URL_DEV_DCUBE = 'http://localhost:8080/dcube-fintech-dev-0.0.1-SNAPSHOT/';
export const URL_DEV_MOBILE_DCUBE = 'http://dcubedev.com/dcube-fintech-dev-0.0.1-SNAPSHOT/';
export const URL_DEMO_DCUBE = 'http://demo.dcubedev.com/dcube-fintech-dev-0.0.1-SNAPSHOT/';
export const URL_TEST_DCUBE = 'http://test.dcubedev.com/dcube-fintech-dev-0.0.1-SNAPSHOT/';
export const URL_LIVE_DCUBE = 'https://dcubedev.com/dcube-fintech-dev-0.0.1-SNAPSHOT/';

export const URL_DEV_SCOM = 'http://localhost:8080/scom-center-dev-0.0.1/sms/';
export const URL_DEV_MOBILE_SCOM = 'http://dcubedev.com/scom-center-dev-0.0.1/sms/';
export const URL_DEMO_SCOM = 'http://demo.dcubedev.com/scom-center-dev-0.0.1/sms/';
export const URL_TEST_SCOM = 'http://test.dcubedev.com/scom-center-dev-0.0.1/sms/';
export const URL_LIVE_SCOM = 'http://dcubedev.com/scom-center-dev-0.0.1/sms/';

/*
  Author: Stephen Agyepong
*/

@Injectable()
export class AppConstants {

    constructor() { }

}

