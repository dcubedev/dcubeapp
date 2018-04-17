import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';
import { RemoteService } from '../../providers/remote-service/remote-service';

declare var StellarSdk: any;

// Stephen's account
export const INFLATION_DESTINATION = 'GCONLWO3FOGT4KTHEVZ3EAPOJ6NUOUTWBH47CBZNDFKNQDQAHKMNPURT';


/*
  Author: Stephen Agyepong
*/

/*
  Generated class for the StellarKeySettingsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarKeySettingsService {
  DCUBE_DEV_BASE_ACCT_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  DCUBE_DEMO_BASE_ACCT_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  DCUBE_PROD_BASE_ACCT_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  DCUBE_TEST_BASE_ACCT_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };


  DCUBE_DEV_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  DCUBE_DEMO_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  DCUBE_PROD_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  DCUBE_TEST_KEYS: CommonConstants.IWalletKey = {
    address: "",
    secret: "",
    mode: "undefined"
  };

  dbKeys: any[];
  selectedDbKeys: any;
  keysStored: CommonConstants.IWalletKey = null;
  public keyEvents$: EventEmitter<any>;

  constructor(private http: Http, private commonSvrc: CommonService,
    private remoteSvrc: RemoteService) {
    this.keyEvents$ = new EventEmitter();
  }

  getDefaultKeys(): CommonConstants.IWalletKey {
    return this.getDefaultKeysSource(this);
  }

  getDefaultKeysSource(self): CommonConstants.IWalletKey {
    self.keysStored = {
      address: "",
      secret: ""
    };

    // on a mobile device
    //if (self.commonSvrc.isMobile) {
    // do nothing we already have the desired values
    //} else {
    //}

    switch (self.commonSvrc.appMode) {
      case CommonConstants.AppMode[CommonConstants.AppMode.PROD]:
        // production mode
        self.keysStored = self.DCUBE_PROD_KEYS;
        break;
      case CommonConstants.AppMode[CommonConstants.AppMode.DEV]:
        // development mode
        self.keysStored = self.DCUBE_DEV_KEYS;
        break;
      case CommonConstants.AppMode[CommonConstants.AppMode.TEST]:
        // testing mode
        self.keysStored = self.DCUBE_TEST_KEYS;
        break;
      default:
        // demonstration/learning mode
        self.keysStored = self.DCUBE_DEMO_KEYS;
    }

    console.log("StellarKeySettingsService::getDefaultKeysSource() self.keysStored: " + JSON.stringify(self.keysStored));
    return self.keysStored;
  }

  getBaseKeys(): CommonConstants.IWalletKey {
    let keys: CommonConstants.IWalletKey = {
      secret: "",
      address: ""
    };
    switch (this.commonSvrc.appMode) {
      case CommonConstants.AppMode[CommonConstants.AppMode.DEV]:
        // development mode
        keys = this.DCUBE_DEV_BASE_ACCT_KEYS;
        break;
      case CommonConstants.AppMode[CommonConstants.AppMode.PROD]:
        // production mode
        //keys = DCUBE_PROD_BASE_ACCT_KEYS;
        break;
      case CommonConstants.AppMode[CommonConstants.AppMode.TEST]:
        // testing mode
        keys = this.DCUBE_TEST_BASE_ACCT_KEYS;
        break;
      default:
        // demonstration/learning mode
        keys = this.DCUBE_DEMO_BASE_ACCT_KEYS;
    }

    return keys;
  }

  appmode: string = 'DEV';
  platformId: string = 'STELLAR';

  getDisplayKeys(dbKeys: any[], toKey: string) {
    let retKeys: any = null;

    for (let i = 0, len = dbKeys.length; i < len; i++) {
      let curKeys = dbKeys[i];
      //console.log("StellarKeySettingsService::getDisplayKeys() curKeys: " + JSON.stringify(curKeys));
      if (curKeys['clientId'] === toKey) {
        retKeys = {
          address: curKeys['acctkeyId'],
          secret: curKeys['kseed']
        };
      }
    }

    return retKeys;
  }

  loadKeysFromDatabase() {
    let self = this;
    let defaultKeys = {};
    let appmode = this.commonSvrc.appMode;
    console.log("StellarKeySettingsService::loadKeysFromDatabase() appmode: " + appmode);

    //let url_p = this.commonSvrc.getDcubeUrl(appmode) + "rest/platform/getAllCurrencyAuthkeys?platform=STELLAR&appmode=" + appmode;
    //let dcube_url = this.commonSvrc.getDcubeUrl(appmode);
    //const url = `${dcube_url}rest/platform/getAllCurrencyAuthkeys?platform=STELLAR&appmode=${appmode}`;
    //const url = `${dcube_url}apps/payments/getAllCurrencyAuthkeysEntities?platform=STELLAR&appmode=${appmode}`;
    //let url_p = this.commonSvrc.getDcubeUrl(appmode) + "rest/platform/getAllCurrencyAuthkeys?platform=STELLAR&appmode=" + appmode;
    const url_p = `http://localhost:8080/apps/payments/getAllCurrencyAuthkeysEntities`;

    let msgBody: any = {
      platformId: this.platformId,
      appmode: this.appmode
    };

    console.log("StellarKeySettingsService::loadKeysFromDatabase() url_p: " + url_p);

    if (url_p != null) {
      console.log("StellarKeySettingsService::loadKeysFromDatabase() url_p: " + url_p);
      this.remoteSvrc.postHttpOld(url_p, msgBody).then(data => {
        self.dbKeys = <any[]>data;
        self.selectedDbKeys = self.getDisplayKeys(self.dbKeys, 'DCUBE_USD_BASE_KEYS');
        console.log("StellarKeySettingsService::loadKeysFromDatabase() self.selectedDbKeys: " + JSON.stringify(self.selectedDbKeys));

        //self.DCUBE_DEMO_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];
        //self.DCUBE_DEV_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];
        //self.DCUBE_TEST_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];
        //self.DCUBE_PROD_KEYS = self.dbKeys['DCUBE_USD_ISSUING_KEYS'];
        //self.DCUBE_PROD_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];

        //self.DCUBE_DEMO_BASE_ACCT_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];
        //self.DCUBE_DEV_BASE_ACCT_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];
        //self.DCUBE_TEST_BASE_ACCT_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];
        //self.DCUBE_PROD_BASE_ACCT_KEYS = self.dbKeys['DCUBE_USD_ISSUING_KEYS'];
        //self.DCUBE_PROD_BASE_ACCT_KEYS = self.dbKeys['DCUBE_USD_BASE_KEYS'];

        self.DCUBE_DEMO_KEYS = self.selectedDbKeys;
        self.DCUBE_DEV_KEYS = self.selectedDbKeys;
        self.DCUBE_TEST_KEYS = self.selectedDbKeys;
        self.DCUBE_PROD_KEYS = self.selectedDbKeys;

        self.DCUBE_DEMO_BASE_ACCT_KEYS = self.selectedDbKeys;
        self.DCUBE_DEV_BASE_ACCT_KEYS = self.selectedDbKeys;
        self.DCUBE_TEST_BASE_ACCT_KEYS = self.selectedDbKeys;
        self.DCUBE_PROD_BASE_ACCT_KEYS = self.selectedDbKeys;

        //safe keys for later
        defaultKeys = self.getDefaultKeysSource(self);
        self.saveKeysStore(self, defaultKeys);
        self.keyEvents$.emit({
          memo: 'KEYS_LOADED_FROM_DB',
          status: defaultKeys
        });
      }, err => {
        console.log("StellarKeySettingsService::loadKeysFromDatabase() err: " + JSON.stringify(err));
      })
    }

    //console.log("StellarKeySettingsService::loadKeysFromDatabase() defaultKeys: " + JSON.stringify(defaultKeys));
    //return defaultKeys;
  }

  loadKeysStore(source?: string): CommonConstants.IWalletKey {
    //loadKeysStore(source?: string) {
    console.log('StellarKeySettingsService::loadKeysStore() source: ' + source);
    if ((undefined !== source || null !== source) &&
      ('loadKeysFromDatabase' === source)) {
      // if source is given then load from the specified source
      this.loadKeysFromDatabase();
    } else {
      let indx: string = this.commonSvrc.appMode;
      console.log('SA SA SA StellarKeySettingsService::loadKeysStore() this.commonSvrc.appMode: ' + this.commonSvrc.appMode);
      if (undefined !== this.keysStored && null !== this.keysStored &&
        undefined !== this.keysStored.address && null !== this.keysStored.address) {
      } else {
        this.keysStored = {
          address: "",
          secret: "",
          mode: "undefined"
        };
      }

      // if we have keys stored, use them otherwise use default keys
      if (undefined !== window && null !== window &&
        undefined !== window.localStorage && null !== window.localStorage &&
        undefined !== window.localStorage[indx] && null !== window.localStorage[indx] &&
        window.localStorage[indx].length > 0) {
        let winstore: CommonConstants.IWalletKey = <CommonConstants.IWalletKey>JSON.parse(window.localStorage[indx]);

        if (undefined !== winstore && null !== winstore &&
          undefined != winstore.address && winstore.address.length > 0) {
          this.keysStored = winstore;
          //console.log('StellarKeySettingsService::loadKeysStore() loading from: winstore');
        } else {
          //console.log('StellarKeySettingsService::loadKeysStore() loading from: loadKeysFromDatabase');
          this.loadKeysFromDatabase();
        }
      } else {
        //console.log('StellarKeySettingsService::loadKeysStore() loading from: loadKeysFromDatabase');
        this.loadKeysFromDatabase();
      }
    }

    console.log('StellarKeySettingsService::loadKeysStore() this.keysStored: ' + JSON.stringify(this.keysStored));
    return this.keysStored;
  }

  saveKeyInStore(indx: string, addr, secret) {
    this.keysStored[indx] = {
      secret: addr,
      address: secret,
      mode: 'stored'
    };
    if (undefined !== this.keysStored && null !== this.keysStored &&
      undefined !== this.keysStored.address && null !== this.keysStored.address &&
      this.keysStored.address.length > 0) {
      //console.log('StellarKeySettingsService::saveKeyInStore() this.keysStored.address.length: ' + this.keysStored.address.length);
      window.localStorage[indx] = JSON.stringify(this.keysStored);
    }
  }

  saveKeysStore(self, keys) {
    if (undefined !== window && null !== window &&
      undefined !== window.localStorage && null !== window.localStorage) {
      let indx: string = this.commonSvrc.appMode;
      console.log('SA SA SA StellarKeySettingsService::saveKeysStore() this.commonSvrc.appMode: ' + this.commonSvrc.appMode);
      self.keysStored = keys;

      if (undefined !== self.keysStored && null !== self.keysStored &&
        undefined !== self.keysStored.address && null !== self.keysStored.address &&
        self.keysStored.address.length > 0) {
        //console.log('StellarKeySettingsService::saveKeysStore() this.keysStored.address.length: ' + this.keysStored.address.length);
        window.localStorage[indx] = JSON.stringify(self.keysStored);
      }
    } else {
      // alert user, we are unable to safe keys
    }
  }

  initKeys() {
    if (null === this.keysStored ||
      (null !== this.keysStored && "" === this.keysStored.address)) {
      //safe keys for later
      this.saveKeysStore(this, this.getDefaultKeys());
    }
  }

  getStellarKeyPair(secretkey) {
    return StellarSdk.Keypair.fromSecret(secretkey);
  }

  genStellarKeypair() {
    let keys: CommonConstants.IWalletKey = {
      secret: "",
      address: ""
    };
    let keyPair = StellarSdk.Keypair.random();
    //console.log('StellarKeySettingsService::genStellarKeypair keyPair: ' + keyPair);

    if (keyPair) {
      keys = {
        secret: keyPair.secret(),
        address: keyPair.publicKey(),
        mode: 'created'
      };
      //console.log('StellarKeySettingsService::genStellarKeypair Account ID: ' + keys.address);
      //console.log(keys.address);
      //console.log('StellarKeySettingsService::genStellarKeypair Secret Key: ' + keys.secret);
      //console.log(keys.secret);
    }

    return keys;
  }

}

