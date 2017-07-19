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

    getMemo(req_type, req_data) {
        let memo = null;
        if (req_data) {
            if (req_type === 'id')
                memo = StellarSdk.Memo.id(req_data.toString());
            else if (req_type === 'hash')
                memo = StellarSdk.Memo.hash(req_data);
            else
                memo = StellarSdk.Memo.text(req_data);
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

    sendFederationRequest(req_data, req_type: string, req_domain?: string) {
        return new Promise((resolve, reject) => {
            let _url = this.srsSrvc.getFederationServerURL();
            if ((undefined !== req_domain) && (null !== req_domain) && ('' !== req_domain)) {
                _url = req_domain;
            }

            let reQuery = null;
            if (req_type === 'id')
                reQuery = '?q=' + req_data + '&type=' + req_type;
            else if (req_type === 'hash')
                reQuery = '?q=' + req_data + '&type=' + req_type;
            else
                reQuery = '?q=' + req_data + '&type=' + req_type;

            let request_p = _url + reQuery;
            console.log("sendFederationRequest() sending GET: " + request_p);

            this.remoteSvrc.getHttp(request_p).then(data => {
                console.log("sendFederationRequest() data: " + JSON.stringify(data));
                resolve(data);
            }, err => {
                console.log("sendFederationRequest() err: " + JSON.stringify(err));
                reject(err);
            });
        });
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
