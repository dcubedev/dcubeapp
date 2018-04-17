import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as CommonConstants from '../../common-service/common-service';

import { StellarKeySettingsService } from '../../stellar/stellar-key-settings-service';


/*
  Author: Stephen Agyepong
*/
@Injectable()
export class KeySettingsService {

  constructor(private http: Http, private stellarKeySvrc: StellarKeySettingsService) { }

  onKeyEvent(callbackObj, acctevtFunc) {
    this.stellarKeySvrc.keyEvents$.subscribe(acctevt => {
      //console.log("KeySettingsService.onKeyEvent() callbackObj: " + callbackObj);
      //console.log("KeySettingsService.onKeyEvent() acctevtFunc: " + acctevtFunc);
      //console.log("KeySettingsService.onKeyEvent() acctevt: " + JSON.stringify(acctevt));
      acctevtFunc(callbackObj, acctevt);
    });
  }

  loadKeysStore(source?: string) {
    this.stellarKeySvrc.loadKeysStore(source);
  }

  genKeypair() {
    return this.stellarKeySvrc.genStellarKeypair();
  }

  saveKeysStore(keysStored) {
    this.stellarKeySvrc.saveKeysStore(this, keysStored);
  }

}

