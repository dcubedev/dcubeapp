import { Injectable } from '@angular/core';

import { RemoteService } from '../../providers/remote-service/remote-service';

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

    constructor(private srsSrvc: StellarRemoteService,
        private remoteSvrc: RemoteService) {
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

    getMemo(memo_p) {
        let memo = null;
        if (memo_p) {
            if (memo_p === 'id')
                memo = StellarSdk.Memo.id(memo_p.toString());
            else if (memo_p === 'hash')
                memo = StellarSdk.Memo.hash(memo_p);
            else
                memo = StellarSdk.Memo.text(memo_p);

        }

        return memo;
    }

    getHttp(serverURL, reQuery) {
        //let _url = this.srsSrvc.getServerURL();
        let request_p = serverURL + reQuery;
        console.log("getHttp() reQuery: " + reQuery);
        console.log("getHttp() request_p: " + request_p);

        this.remoteSvrc.getHttp(request_p).then(data => {
            console.log("getHttp() data: " + JSON.stringify(data));
        }, err => {
            console.log("getHttp() err: " + JSON.stringify(err));
        })
    }

    sendFederationRequest(e_address, e_type) {
        //let _url = StellarConstants.URL_DEV_FEDERATION;
        let _url = this.srsSrvc.getFederationServerURL();
        let reQuery = '?q=' + e_address + '&type=' + e_type;
        let request_p = _url + reQuery;
        console.log("sendFederationRequest() sending GET: " + request_p);

        this.remoteSvrc.getHttp(request_p).then(data => {
            console.log("sendFederationRequest() data: " + JSON.stringify(data));
        }, err => {
            console.log("sendFederationRequest() err: " + JSON.stringify(err));
        })
    }

    getTomlByDomain(domain) {
        return new Promise((resolve, reject) => {
            let anchorDomain = domain.startsWith('https://') ?
                domain.substring(8) : // strip leading protocol
                domain;

            // get all items defined in a TOML domain configuration file
            StellarSdk.StellarTomlResolver.resolve(anchorDomain)
                .then((toml) => {
                    console.log(JSON.stringify(toml));
                    resolve(toml);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    reject(error);
                });
        });
    }

    getFederationServer(domain) {
        return new Promise((resolve, reject) => {
            let anchorDomain = domain.startsWith('https://') ?
                domain.substring(8) : // strip leading protocol
                domain;

            // tomlObject.FEDERATION_SERVER
            StellarSdk.StellarTomlResolver.resolve(anchorDomain)
                .then((toml) => {
                    console.log(JSON.stringify(toml));
                    console.log("getFederationServer() toml.FEDERATION_SERVER: " + toml.FEDERATION_SERVER);
                    resolve(toml.FEDERATION_SERVER);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    reject(error);
                });
        });
    }

}
