import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//import * as StellarSdk from "www/build/stellar-sdk";

import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';
import * as StellarConstants from "../../providers/stellar-constants/stellar-constants";

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

    constructor(private http: Http, private commonSvrc: CommonService) {
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

    isConnected() {
        //console.log("this.server: " + this.server)
        return (null !== this.server) ? true : false;
    }

    initServer() {
        this.resetServer(this);
    }

    resetServer(self) {
        //console.log('initServer() this.comSrvc.appMode: ', this.comSrvc.appMode);
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
            self.server = new StellarSdk.Server(self.hostname, { secure: true, port: 443, allowHttp: true });
        }
    }

    getServer() {
        if (null === this.server) {
            this.initServer();
        }

        return this.server;
    }

    getBridgeServerURL(): string {
        return this.bridgeServerURL;
    }

    getFederationServerURL(): string {
        return this.federationServerURL;
    }

    send(data) {
        try {
            if (this.isConnected()) {
                let msg = JSON.stringify(data);
                console.log(msg);
                //ws.send(msg);
            }
        }
        catch (ex) {
            //UIHelper.showAlert('Network communication failed: ' + ex.message);
        }
    }

}

