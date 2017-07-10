import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';
import { RemoteService } from '../../providers/remote-service/remote-service';
import { StellarCommonService } from '../stellar/stellar-common-service';
import { StellarKeySettingsService } from '../stellar/stellar-key-settings-service';
import { StellarRemoteService } from '../../providers/stellar/stellar-remote-service';
//import * as StellarConstants from "../../providers/stellar/stellar-constants";

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
        private scsSvrc: StellarCommonService,
        private keysettings: StellarKeySettingsService,
        private srsSrvc: StellarRemoteService) {
    }

    parsePath(path_p) {
        return '';
    }

    createPassiveOffer(transaction: CommonConstants.ITransaction) {
        // The exchange rate ratio (selling / buying)
        return new Promise((resolve, reject) => {
            let selling = transaction.asset_code;
            let selling_issuer = transaction.selling_issuer;
            let buying = transaction.dest_asset_code;
            let buying_issuer = transaction.buying_issuer;
            let amount: string = '' + transaction.amount;
            let price: CommonConstants.IPrice = transaction.price;
            let source = transaction.sender;
            let sender_secret = transaction.sender_secret;

            let selling_asset = this.scsSvrc.getAssetObject(selling, selling_issuer);
            let buying_asset = this.scsSvrc.getAssetObject(buying, buying_issuer);
            
            let operation = StellarSdk.Operation.createPassiveOffer({
                selling: selling_asset,
                buying: buying_asset,
                amount: amount,
                price: price,
                source: source
            });
      
            this.srsSrvc.submitTransaction(source, sender_secret, operation).then(data => {
                resolve(data);
            },
            onerr => {
                console.error('StellarTradingService::createPassiveOffer() error: ' + JSON.stringify(onerr));
                reject(onerr);
            });
        });

    }

    manageOffers(transaction: CommonConstants.ITransaction) {
        // The exchange rate ratio (selling / buying)
        return new Promise((resolve, reject) => {
            let selling = transaction.asset_code;
            let selling_issuer = transaction.selling_issuer;
            let buying = transaction.dest_asset_code;
            let buying_issuer = transaction.buying_issuer;
            let amount: string = '' + transaction.amount;
            let price: CommonConstants.IPrice = transaction.price;
            let offerId_p = transaction.offerId;
            let source = transaction.sender;
            let sender_secret = transaction.sender_secret;

            let offerId = 0; // assume new offer to create
            if (undefined !== offerId) {
                offerId = offerId_p;
            }

            let selling_asset = this.scsSvrc.getAssetObject(selling, selling_issuer);
            let buying_asset = this.scsSvrc.getAssetObject(buying, buying_issuer);

            let operation = StellarSdk.Operation.manageOffer({
                selling: selling_asset,
                buying: buying_asset,
                amount: amount,
                price: price,
                offerId: offerId,
                source: source
            });

            this.srsSrvc.submitTransaction(source, sender_secret, operation).then(data => {
                resolve(data);
            },
            onerr => {
                console.error('StellarTradingService::manageOffers() error: ' + JSON.stringify(onerr));
                reject(onerr);
            });
        });

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
        let _url = this.srsSrvc.getServerURL();
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

