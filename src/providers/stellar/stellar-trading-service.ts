import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { CommonService } from '../common-service/common-service';
import { RemoteService } from '../../providers/remote-service/remote-service';
import { StellarKeySettingsService } from '../stellar/stellar-key-settings-service';
import { StellarRemoteService } from '../../providers/stellar/stellar-remote-service';
import * as StellarConstants from "../../providers/stellar/stellar-constants";

declare var StellarSdk: any;

/*
  Generated class for the StellarTradingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarTradingService {

    constructor(private comSrvc: CommonService,
        private remoteSvrc: RemoteService,
        private keysettings: StellarKeySettingsService,
        private srsSrvc: StellarRemoteService) {
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

    orderBookTrades() {
        // https://horizon-testnet.stellar.org/order_book/trades
        let _url = StellarConstants.URL_LIVE_NETWORK;
        //let _url = this.srsSrvc.getServerURL();
        //let reQuery = '/order_book/trades';
        //let reQuery = '/order_book?selling_asset_type={selling_asset_type}&selling_asset_code={selling_asset_code}';
        let reQuery = '/order_book?selling_asset_type={native}';
        let request_p = _url + reQuery;
        console.log("orderBookTrades() reQuery: " + reQuery);
        console.log("orderBookTrades() request_p: " + request_p);

        this.remoteSvrc.getHttp(request_p).then(data => {
            console.log("orderBookTrades() data: " + JSON.stringify(data));
        }, err => {
            console.log("orderBookTrades() err: " + JSON.stringify(err));
        })

    }
}

