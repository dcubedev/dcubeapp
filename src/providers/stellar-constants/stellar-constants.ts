import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export const HOME_DOMAIN = 'zoomsika.com';

export const URL_LIVE_NETWORK = 'https://horizon.stellar.org';
export const URL_TEST_NETWORK = 'https://horizon-testnet.stellar.org';
export const URL_FRIENDBOT = 'https://horizon-testnet.stellar.org/friendbot';
export const URL_LIVE_BRIDGE = 'http://dcubedev.com:8001/payment';
export const URL_TEST_BRIDGE = 'https://horizon-testnet.stellar.org:8001/payment';
export const URL_DEV_BRIDGE = 'http://dev.dcubedev.com:8001/payment';
export const URL_DEMO_BRIDGE = 'http://demo.dcubedev.com:8001/payment';
export const URL_LIVE_FEDERATION = 'https://dcubedev.com:8002/federation';
export const URL_TEST_FEDERATION = 'https://horizon-testnet.stellar.org:8002/federation';
export const URL_DEV_FEDERATION = 'http://dev.dcubedev.com:8002/federation';
export const URL_DEMO_FEDERATION = 'http://demo.dcubedev.com:8002/federation';

export const NATIVE_CURRENCY_XLM = 'XLM';

export const accountEffectLimit = 30;
export const reserveChunkCost = 10;
export const inflationDestBalanceBuffer = 10;

/*
  Generated class for the StellarConstants provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarConstants {

    constructor(private http: Http) { }

}

