import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as CommonConstants from '../../common-service/common-service';

import { StellarKeySettingsService } from '../../stellar/stellar-key-settings-service';


/*
  Author: Stephen Agyepong
*/
@Injectable()
export class KeySettingsService {
  
    constructor(private http: Http, private stellarKeySvrc: StellarKeySettingsService) {}

    onKeyEvent(callbackObj, acctevtFunc) {
        //console.log("KeySettingsService.onKeyEvent() acctevtFunc: " + acctevtFunc);
        this.stellarKeySvrc.keyEvents$.subscribe(acctevt => {
            acctevtFunc(callbackObj, acctevt);
        });
    }

    loadKeysStore(source?: string): CommonConstants.IWalletKey {
        return this.stellarKeySvrc.loadKeysStore(source);
    }

    genKeypair() {
        return this.stellarKeySvrc.genStellarKeypair();
    }

    saveKeysStore(keysStored) {
        this.stellarKeySvrc.saveKeysStore(keysStored);
    }

}

