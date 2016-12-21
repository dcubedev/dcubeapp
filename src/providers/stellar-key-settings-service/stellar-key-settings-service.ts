import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';

declare var StellarSdk: any;

/*
  Author: Stephen Agyepong
*/

// ZOOMSIKA_USD_CLIENT_KEYS
// ZOOMSIKA_USD_ISSUING_KEYS
// ZOOMSIKA_USD_BASE_KEYS
export const ZOOMSIKA_DEV_KEYS: CommonConstants.IWalletKey = ZOOMSIKA_DEV_BASE_ACCT_KEYS;
//export const ZOOMSIKA_DEV_KEYS: CommonConstants.IWalletKey = ZOOMSIKA_USD_ISSUING_KEYS;
export const ZOOMSIKA_DEMO_KEYS: CommonConstants.IWalletKey = ZOOMSIKA_DEV_BASE_ACCT_KEYS;
//export const ZOOMSIKA_PROD_KEYS: CommonConstants.IWalletKey = ZOOMSIKA_PROD_BASE_ACCT_KEYS;
export const ZOOMSIKA_PROD_KEYS: CommonConstants.IWalletKey = ZOOMSIKA_USD_ISSUING_KEYS;


/*
  Generated class for the StellarKeySettingsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarKeySettingsService {
    keysStored: CommonConstants.IWalletKey = null;

    constructor(private http: Http, private comSrvc: CommonService) {
    }

    loadKeysStore(): CommonConstants.IWalletKey {
        this.getDefaultKeys();

        let indx: string = this.comSrvc.appMode;
    
        if (undefined !== window && null !== window &&
            undefined !== window.localStorage && null !== window.localStorage) {
            let winstore = window.localStorage[indx];
            //console.log('loadKeysStore() window.localStorage[indx]: ' + winstore);
            if (undefined !== winstore && null !== winstore) {
                this.keysStored = JSON.parse(winstore);
            }
        }

        return this.keysStored;
    }

    saveKeyInStore(indx: string, addr, secret) {
        this.keysStored[indx] = {
            secret: addr,
            address: secret,
            mode: 'stored'
        };
        window.localStorage[indx] = JSON.stringify(this.keysStored);
    }

    saveKeysStore(keys) {
        if (undefined !== window && null !== window &&
            undefined !== window.localStorage && null !== window.localStorage) {
            let indx: string = this.comSrvc.appMode;
            this.keysStored = keys;
            
            window.localStorage[indx] = JSON.stringify(this.keysStored);
        } else {
            // alert user, we are unable to safe keys
        }
    }

    initKeys() {
        if (null === this.keysStored ||
            (null !== this.keysStored && "" === this.keysStored.address)) {
            //safe keys for later
            this.saveKeysStore(this.getDefaultKeys());
        }
    }

    getDefaultKeys(): CommonConstants.IWalletKey {
        this.keysStored = {
            address: "",
            secret: ""
        };

        // on a mobile device
        if (this.comSrvc.isMobile) {
            // do nothing we already have the desired values
        } else {
            switch (this.comSrvc.appMode) {
                case CommonConstants.AppMode[CommonConstants.AppMode.PROD]:
                    // production mode
                    //this.keysStored = ZOOMSIKA_PROD_KEYS;
                    this.keysStored = ZOOMSIKA_PROD_KEYS;
                    break;
                case CommonConstants.AppMode[CommonConstants.AppMode.DEMO]:
                    // demonstration/learning mode
                    this.keysStored = ZOOMSIKA_DEMO_KEYS;
                    break;
                case CommonConstants.AppMode[CommonConstants.AppMode.TEST]:
                    // demonstration/learning mode
                    this.keysStored = ZOOMSIKA_DEV_KEYS;
                    break;
                default:
                    // development/testing mode
                    this.keysStored = ZOOMSIKA_DEV_KEYS;
            }
        }
        //console.log('loadKeysStore() this.keysStored.address: ' + this.keysStored.address);
        //console.log('loadKeysStore() this.keysStored.secret: ' + this.keysStored.secret);
        return this.keysStored;
    }

    getBaseKeys(): CommonConstants.IWalletKey {
        let keys: CommonConstants.IWalletKey = {
            secret: "",
            address: ""
        };
        switch (this.comSrvc.appMode) {
            case CommonConstants.AppMode[CommonConstants.AppMode.PROD]:
                // production mode
                //keys = ZOOMSIKA_PROD_BASE_ACCT_KEYS;
                break;
            case CommonConstants.AppMode[CommonConstants.AppMode.DEMO]:
                // demonstration/learning mode
                keys = ZOOMSIKA_DEMO_BASE_ACCT_KEYS;
                break;
            case CommonConstants.AppMode[CommonConstants.AppMode.TEST]:
                // demonstration/learning mode
                keys = ZOOMSIKA_DEV_BASE_ACCT_KEYS;
                break;
            default:
                // development/testing mode
                keys = ZOOMSIKA_DEV_BASE_ACCT_KEYS;
        }

        return keys;
    }

    getStellarKeyPair(secretkey) {
        // return StellarSdk.Keypair.fromSeed(this.keys.secret);
        return StellarSdk.Keypair.fromSeed(secretkey);
    }

    genStellarKeypair() {
        let keys: CommonConstants.IWalletKey = {
            secret: "",
            address: ""
        };
        let keyPair = StellarSdk.Keypair.random();
        console.log('genStellarKeypair keyPair: ' + keyPair);

        if (keyPair) {
            keys = {
                secret: keyPair.seed(),
                address: keyPair.accountId(),
                mode: 'created'
            };
            console.log('genStellarKeypair Account ID: ' + keys.address);
            console.log(keys.address);
            console.log('genStellarKeypair Secret Key: ' + keys.secret);
            console.log(keys.secret);
        }

        return keys;
    }

}

