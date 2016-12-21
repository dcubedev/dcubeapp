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
        this.stsSrvc.sendFederationRequest(e_address, e_type);
    }

    orderBookInfo(sellAddr, sellCurr, buyAddr, buyCurr) {
        this.stsSrvc.orderBookInfo(sellAddr, sellCurr, buyAddr, buyCurr);
    }

}

