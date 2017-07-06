import { Injectable } from '@angular/core';

import * as CommonConstants from '../../common-service/common-service';
import { StellarRemoteService } from '../../stellar/stellar-remote-service';
import { StellarTradingService } from '../../stellar/stellar-trading-service';

/*
  Author: Stephen Agyepong
*/
@Injectable()
export class TradingService {

    constructor(private stsSrvc: StellarTradingService,
        private srsSrvc: StellarRemoteService) {
    }
    
    sendFederationRequest(e_address, e_type) {
        //let self = this;
        //let promise = new Promise(function (resolve, reject) {
        //    resolve(balances);
        //    reject(err);
        //});
        //return promise;
        this.stsSrvc.sendFederationRequest(e_address, e_type);
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

    createPassiveOffer(transaction: CommonConstants.ITransaction) {
        return new Promise((resolve, reject) => {
            this.stsSrvc.createPassiveOffer(transaction).then(data => {
                console.log('TradingService::createPassiveOffer() data: ' + JSON.stringify(data));
                resolve(data);
            },
                onerr => {
                    console.error('TradingService::createPassiveOffer() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                });
        });
    }

    manageOffers(transaction: CommonConstants.ITransaction) {
        return new Promise((resolve, reject) => {
            this.stsSrvc.manageOffers(transaction).then(data => {
                console.log('TradingService::manageOffers() data: ' + JSON.stringify(data));
                resolve(data);
            },
            onerr => {
                console.error('TradingService::manageOffers() error: ' + JSON.stringify(onerr));
                reject(onerr);
            });
        });
    }

    getOrderBookTrades() {
        //let self = this;
        //let promise = new Promise(function (resolve, reject) {
        //    resolve(balances);
        //    reject(err);
        //});
        //return promise;
        this.stsSrvc.orderBookTrades();
    }

    orderBookInfo(sellAddr, sellCurr, buyAddr, buyCurr) {
        //let self = this;
        //let promise = new Promise(function (resolve, reject) {
        //    resolve(balances);
        //    reject(err);
        //});
        //return promise;
        this.stsSrvc.orderBookInfo(sellAddr, sellCurr, buyAddr, buyCurr);
    }

}

