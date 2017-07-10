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
    
    sendFederationRequest(e_address, e_type) {
        //let self = this;
        //let promise = new Promise(function (resolve, reject) {
        //    resolve(balances);
        //    reject(err);
        //});
        //return promise;
        this.scsSrvc.sendFederationRequest(e_address, e_type);
    }

    getHttpHorizon(reQuery: string, opname?: string) {
        return new Promise((resolve, reject) => {
            this.srsSrvc.getHttpHorizon(reQuery, opname).then(data => {
                console.log('TradingService::getHttpHorizon() data: ' + JSON.stringify(data));
                resolve(data);
            },
            onerr => {
                console.error('TradingService::getHttpHorizon() error: ' + JSON.stringify(onerr));
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
    
}

