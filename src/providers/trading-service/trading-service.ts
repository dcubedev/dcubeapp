import { Injectable } from '@angular/core';

import { StellarTradingService } from '../../providers/stellar-trading-service/stellar-trading-service';

/*
  Author: Stephen Agyepong
*/
@Injectable()
export class TradingService {

    constructor(private stsSrvc: StellarTradingService) {
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

