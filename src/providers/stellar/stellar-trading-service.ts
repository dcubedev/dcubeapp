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

    parsePath(path_p) {
        return '';
    }

    paymentPath(transaction: CommonConstants.ITransaction) {
        return new Promise((resolve, reject) => {
            let send_asset = transaction.asset_code;
            let send_max_amount = transaction.send_max_amount;
            let receiver = transaction.receiver;
            let dest_asset_code = transaction.dest_asset_code;
            let dest_asset_issuer = transaction.buying_issuer;
            let dest_amount = transaction.dest_amount;
            let destAsset = this.scsSvrc.getAssetObject(dest_asset_code, dest_asset_issuer);

            let source = transaction.sender;
            let source_r = '';
            if (undefined !== source) {
                source_r = '&source=' + source;
            }

            let path_p = transaction.path;
            let path_r = '';
            if (undefined !== source) {
                path_r = '&path=' + this.parsePath(path_p);
            }

            let _url = this.srsSrvc.getServerURL() + "/pathPayment";
            let reQuery = '?sendAsset=' + send_asset + '&sendMax=' + send_max_amount
                + '&destination=' + receiver + '&destAsset=' + destAsset
                + path_r + source_r;
            let request_p = _url + reQuery;
            console.log("StellarTradingService::paymentPath() sending GET: " + request_p);

            this.remoteSvrc.getHttp(request_p).then(data => {
                console.log('StellarTradingService::paymentPath() data: ' + JSON.stringify(data));
                resolve(data);
                },
                onerr => {
                    console.error('StellarTradingService::paymentPath() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                });
        });

    }

    createPassiveOffer(transaction: CommonConstants.ITransaction) {
        // The exchange rate ratio (selling / buying)
        return new Promise((resolve, reject) => {
            let selling = transaction.asset_code;
            let selling_issuer = transaction.selling_issuer;
            let buying = transaction.dest_asset_code;
            let buying_issuer = transaction.buying_issuer;
            let amount = transaction.amount;
            let price: CommonConstants.IPrice = transaction.price;
            let source = transaction.sender;

            let source_r = '';
            if (undefined !== source) {
                source_r = '&source=' + source;
            }

            let selling_asset = this.scsSvrc.getAssetObject(selling, selling_issuer);
            let buying_asset = this.scsSvrc.getAssetObject(buying, buying_issuer);
            console.log("StellarTradingService::createPassiveOffer() selling: " + selling);
            console.log("StellarTradingService::createPassiveOffer() selling: " + selling);
            console.log("StellarTradingService::createPassiveOffer() buying: " + buying);
            console.log("StellarTradingService::createPassiveOffer() buying_issuer: " + buying_issuer);
            console.log("StellarTradingService::createPassiveOffer() price.sell_units: " + price.numerator);
            console.log("StellarTradingService::createPassiveOffer() price.buy_units: " + price.denominator);

            let _url = this.srsSrvc.getServerURL() + "/createPassiveOffer";
            let reQuery = '?selling=' + selling_asset + '&buying=' + buying_asset
                + '&amount=' + amount + '&price=' + price
                + source_r;
            let request_p = _url + reQuery;
            console.log("StellarTradingService::createPassiveOffer() sending GET: " + request_p);

            this.remoteSvrc.getHttp(request_p).then(data => {
                console.log('StellarTradingService::createPassiveOffer() data: ' + JSON.stringify(data));
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
            let amount = transaction.amount;
            let price: CommonConstants.IPrice = transaction.price;
            let offerId_p = transaction.offerId;
            let source = transaction.sender;

            let offerId = 0; // assume new offer to create
            if (undefined !== offerId) {
                offerId = offerId_p;
            }

            let source_r = '';
            if (undefined !== source) {
                source_r = '&source=' + source;
            }

            let selling_asset = this.scsSvrc.getAssetObject(selling, selling_issuer);
            let buying_asset = this.scsSvrc.getAssetObject(buying, buying_issuer);
            console.log("StellarTradingService::manageOffers() selling: " + selling);
            console.log("StellarTradingService::manageOffers() selling: " + selling);
            console.log("StellarTradingService::manageOffers() buying: " + buying);
            console.log("StellarTradingService::manageOffers() buying_issuer: " + buying_issuer);
            console.log("StellarTradingService::manageOffers() price.sell_units: " + price.numerator);
            console.log("StellarTradingService::manageOffers() price.buy_units: " + price.denominator);

            let _url = this.srsSrvc.getServerURL() + "/manageOffer";
            let reQuery = '?selling=' + selling_asset + '&buying=' + buying_asset
                + '&amount=' + amount + '&price=' + price
                + '&offerId=' + offerId + source_r;
            let request_p = _url + reQuery;
            console.log("StellarTradingService::manageOffers() sending GET: " + request_p);

            this.remoteSvrc.getHttp(request_p).then(data => {
                console.log('StellarTradingService::manageOffers() data: ' + JSON.stringify(data));
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

