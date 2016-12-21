import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { CommonService } from '../common-service/common-service';
import { StellarKeySettingsService } from '../stellar-key-settings-service/stellar-key-settings-service';
import { StellarRemoteService } from '../../providers/stellar-remote-service/stellar-remote-service';

declare var StellarSdk: any;

/*
  Generated class for the StellarTradingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarTradingService {

    constructor(private comSrvc: CommonService,
        private keysettings: StellarKeySettingsService,
        private srsSrvc: StellarRemoteService) {
    }
    
    sendFederationRequest(e_address, e_type) {
        let _url = this.srsSrvc.getFederationServerURL();
        let request_p = _url + '?q=' + e_address + '&type=' + e_type;
        console.log("sendFederationRequest() sending GET: " + request_p);
   
        this.comSrvc.getHttp(request_p).then(data => {
            console.log("sendFederationRequest() data: " + JSON.stringify(data));
        }, err => {
            console.log("sendFederationRequest() err: " + JSON.stringify(err));
        })
    }

    orderBookInfo(sellAddr, sellCurr, buyAddr, buyCurr) {
        let server = this.srsSrvc.getServer();
        let sellAsset = new StellarSdk.Asset(sellCurr, sellAddr);
        let buyAsset = new StellarSdk.Asset(buyCurr, buyAddr);

        server.orderbook(sellAsset, buyAsset)
            .trades()
            .call()
            .then((resp) => { console.log(resp); })
            .catch((err) => { console.log(err); })
    }

}

