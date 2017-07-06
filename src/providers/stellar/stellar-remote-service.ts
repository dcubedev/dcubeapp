import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RemoteService } from '../../providers/remote-service/remote-service';

import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';
import * as StellarConstants from "../../providers/stellar/stellar-constants";

declare var StellarSdk: any;

/*
  Generated class for the StellarRemoteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarRemoteService {
    //network = 'liveNetwork';
    //network = 'testNetwork';
    network = '';
    //hostname = 'horizon.stellar.org';
    //hostname = 'horizon-testnet.stellar.org';
    hostname = '';
    server: any = null;
    bridgeServerURL: string = null;
    federationServerURL: string = null;

    constructor(public http: Http,
        public remoteSvrc: RemoteService,
        public commonSvrc: CommonService) {
        let self = this;
        this.initServer();
        commonSvrc.commonEvents$.subscribe(commonevt => { this.onCommonEvent(commonevt, self) });
    }

    onCommonEvent(acctevt, self) {
        //memo: 'appMode',
        //status: APPMODE_CHANGED
        if (CommonConstants.APPMODE === acctevt.memo && CommonConstants.APPMODE_CHANGED === acctevt.status) {
            self.resetServer(self);
        }
    }

    initServer() {
        this.resetServer(this);
    }

    isConnected() {
        //console.log("this.server: " + this.server)
        return (null !== this.server) ? true : false;
    }

    getServer() {
        if (null === this.server) {
            this.initServer();
        }

        return this.server;
    }

    getServerURL(): string {
        return this.hostname;
    }

    getBridgeServerURL(): string {
        return this.bridgeServerURL;
    }

    getFederationServerURL(): string {
        return this.federationServerURL;
    }

    resetServer(self) {
        //console.log('resetServer() this.comSrvc.appMode: ', this.comSrvc.appMode);
        if (CommonConstants.AppMode[CommonConstants.AppMode.PROD] === self.commonSvrc.appMode) {
            self.bridgeServerURL = StellarConstants.URL_LIVE_BRIDGE;
            self.federationServerURL = StellarConstants.URL_LIVE_FEDERATION;
            self.network = 'liveNetwork';
            self.hostname = StellarConstants.URL_LIVE_NETWORK;
            StellarSdk.Network.usePublicNetwork();
            self.server = new StellarSdk.Server(self.hostname, { secure: true, port: 443 });
        } else {
            if (CommonConstants.AppMode[CommonConstants.AppMode.TEST] === self.commonSvrc.appMode) {
                self.bridgeServerURL = StellarConstants.URL_TEST_BRIDGE;
                self.federationServerURL = StellarConstants.URL_TEST_FEDERATION; 
            } else {
                if (CommonConstants.AppMode[CommonConstants.AppMode.DEMO] === self.commonSvrc.appMode) {
                    self.bridgeServerURL = StellarConstants.URL_DEMO_BRIDGE;
                    self.federationServerURL = StellarConstants.URL_DEMO_FEDERATION;
                } else {
                    self.bridgeServerURL = StellarConstants.URL_DEV_BRIDGE;
                    self.federationServerURL = StellarConstants.URL_DEV_FEDERATION;
                }
            }
            self.network = 'testNetwork';
            self.hostname = StellarConstants.URL_TEST_NETWORK;
            StellarSdk.Network.useTestNetwork();
            self.server = new StellarSdk.Server(self.hostname, { secure: true, port: 443, allowHttp: true });
        }
    }

    getHttpHorizon(reQuery: string, opname?: string) {
        return new Promise((resolve, reject) => {
            let opname_r = '';
            if (undefined !== opname) {
                opname_r = '/' + opname;
            }
            let _url = this.getServerURL() + opname_r;

            let request_p = _url + reQuery;
            console.log("StellarRemoteService::getHttpHorizon() _url: " + _url);
            console.log("StellarRemoteService::getHttpHorizon() reQuery: " + reQuery);
            console.log("StellarRemoteService::getHttpHorizon() sending GET: " + request_p);
            
            this.remoteSvrc.getHttp(request_p).then(data => {
                console.log('StellarRemoteService::getHttpHorizon() data: ' + JSON.stringify(data));
                resolve(data);
            },
            onerr => {
                console.error('StellarRemoteService::getHttpHorizon() error: ' + JSON.stringify(onerr));
                reject(onerr);
            });
        });

    }

    submitTransaction(account_id, secret, operation) {
        let self = this;
        return new Promise(function (resolve, reject) {
            console.log("StellarRemoteService::submitTransaction() account_id: " + account_id);
            console.log("StellarRemoteService::submitTransaction() secret: " + secret);
            console.log("StellarRemoteService::submitTransaction() operation: " + operation);

            console.log("StellarRemoteService::submitTransaction() account_id: " + account_id);
            let server = self.getServer();
            console.log("StellarRemoteService::submitTransaction() server: " + server);
            server.loadAccount(account_id)
                .then(sourceAccount => {
                    let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                        .addOperation(operation)
                        .build();

                    // sign the transaction
                    console.log("StellarRemoteService::submitTransaction() transaction: " + transaction);
                    transaction.sign(StellarSdk.Keypair.fromSecret(secret));

                    // transaction is now ready to be sent to the network or saved somewhere
                    // Ok, send it off to Stellar!
                    server.submitTransaction(transaction)
                        .then(transactionResult => {
                            console.log("StellarRemoteService::submitTransaction() transactionResult: " + transactionResult);
                            resolve(transactionResult);
                        }, err => {
                            console.log("StellarRemoteService::submitTransaction() err: " + err);
                            reject(err);
                        })
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

}

