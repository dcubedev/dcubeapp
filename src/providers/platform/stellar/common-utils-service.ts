import { Injectable } from '@angular/core';

import { StellarCommonService } from '../../stellar/stellar-common-service';
import { StellarRemoteService } from '../../stellar/stellar-remote-service';

/*
  Author: Stephen Agyepong
*/
@Injectable()
export class CommonUtilsService {

    constructor(private scsSrvc: StellarCommonService,
        private srsSrvc: StellarRemoteService) {
    }

    getFederationServer(domain) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.scsSrvc.getFederationServer(domain)
                .then((fedurl) => {
                    resolve(fedurl);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    sendFederationRequest(req_data, req_type: string, req_domain?: string) {
        return new Promise((resolve, reject) => {
            this.scsSrvc.sendFederationRequest(req_data, req_type, req_domain)
                .then(data => {
                    console.log('CommonUtilsService::sendFederationRequest() data: ' + JSON.stringify(data));
                    resolve(data);
                },
                onerr => {
                    console.error('CommonUtilsService::sendFederationRequest() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                });
        });
    }

    getHttpHorizon(reQuery: string, opname?: string) {
        return new Promise((resolve, reject) => {
            this.srsSrvc.getHttpHorizon(reQuery, opname).then(data => {
                console.log('CommonUtilsService::getHttpHorizon() data: ' + JSON.stringify(data));
                resolve(data);
            },
            onerr => {
                console.error('CommonUtilsService::getHttpHorizon() error: ' + JSON.stringify(onerr));
                reject(onerr);
            });
        });
    }

    getTomlByDomain(domain) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.scsSrvc.getTomlByDomain(domain)
                .then((toml) => {
                    resolve(toml);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
    
}

