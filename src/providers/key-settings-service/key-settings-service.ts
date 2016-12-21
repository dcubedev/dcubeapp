import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as CommonConstants from '../common-service/common-service';

import { StellarKeySettingsService } from '../stellar-key-settings-service/stellar-key-settings-service';


/*
  Author: Stephen Agyepong
*/
@Injectable()
export class KeySettingsService {
  
    constructor(private http: Http, private stellarKeySvrc: StellarKeySettingsService) {}

    loadKeysStore(): CommonConstants.IWalletKey {
        return this.stellarKeySvrc.loadKeysStore();
    }

    genKeypair() {
        return this.stellarKeySvrc.genStellarKeypair();
    }

    saveKeysStore(keysStored) {
        this.stellarKeySvrc.saveKeysStore(keysStored);
    }

}

