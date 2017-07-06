import { Injectable } from '@angular/core';

import * as StellarConstants from "../stellar/stellar-constants";
import { StellarRemoteService } from '../../providers/stellar/stellar-remote-service';

declare var StellarSdk: any;

/*
  Generated class for the StellarCommon provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarCommonService {

    constructor(private srsSrvc: StellarRemoteService) {
    }

    isAssetNative(curr): boolean {
        if (curr === undefined || curr === 'native' || curr === StellarConstants.NATIVE_CURRENCY_XLM || curr === null) {
            return true;
        } else {
            return false;
        }
    }

    getAssetObject(asset_code, asset_issuer) {
        let asset;
        if (this.isAssetNative(asset_code)) {
            asset = StellarSdk.Asset.native();
        } else {
            asset = new StellarSdk.Asset(asset_code, asset_issuer);
        }

        return asset;
    }

}
