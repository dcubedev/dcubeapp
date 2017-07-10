import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRCode, ErrorCorrectLevel, QRAlphaNum } from 'qrcode-generator-ts/js';

import { CommonService } from '../../providers/common-service/common-service';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonUtilsService } from '../../providers/platform/stellar/common-utils-service';

/*
  Author: Stephen Agyepong
*/

@Component({
    templateUrl: 'receive.html'
})
export class ReceivePage {
    pnames: string[];
    selectedPname: string;
    htmlText: any;
    barcodeImg: any;
    fullImagePath: any;
    account: CommonConstants.IAccount;

    constructor(private navCtrl: NavController, public menuCtrl: MenuController,
        private barcodeScanner: BarcodeScanner,
        private socialSharing: SocialSharing,
        private commonSvrc: CommonService,
        private cusSvrc: CommonUtilsService) {

    }

    ngOnInit() {
        this.pnames = this.commonSvrc.getPlatformContextPnames();
        this.commonSvrc.initAccount(this);
        this.encodeQrcode();
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    share() {
        let subject = this.commonSvrc.translateString("Payment Public Key");
        let file = null;
        let url = null;
        this.socialSharing.share(this.account.address, subject, file, url).then(() => {
            // Success!
            console.log("ReceivePage.share() Success: " );
        }).catch(() => {
            // Error!
            console.log("ReceivePage.share() Error: " );
        });
    }

    encodeQrcode() {
        let qr = new QRCode();
        qr.setTypeNumber(5);
        qr.setErrorCorrectLevel(ErrorCorrectLevel.L);
        qr.addData(new QRAlphaNum(this.account.address)); // Alphabet and Number
        qr.make();

        this.fullImagePath = qr.toDataURL();
        console.log("ReceivePage.encodeQrcode() this.fullImagePath: " + this.fullImagePath);
    }

    encodeText() {
        let type = this.barcodeScanner.Encode.TEXT_TYPE;
        let data = 'GANKXD6D7UH7HUUMZGFZWK6NDS6TYB5GO6NIWSN36B3JPCSCE7QV3Y5N';
        console.log("ReceivePage.encodeText() type: " + type);
        this.barcodeScanner.encode(type, data).then((barcodeData) => {
            console.log("ReceivePage.encodeText() barcodeData: " + barcodeData);
            // Success! Barcode data is here
            //this.htmlText = barcodeData;
            this.barcodeImg = barcodeData;
        }, (err) => {
            // An error occurred
            console.log("ReceivePage.encodeText() err: " + err);
        });
    }

    anotheracct() {
        console.log("ReceivePage::receivePayment() this.selectedPname: " + this.selectedPname);
        let pcntx: CommonConstants.IPlatformContext = this.commonSvrc.findPlatformContext(this.selectedPname);
        console.log("ReceivePage::receivePayment(findPlatformContext) pcntx.anchorUrl: " + pcntx.anchorUrl);
        let tomlurl = pcntx.anchorUrl + '/.well-known/stellar.toml';
        console.log("ReceivePage::receivePayment() tomlurl: " + tomlurl);

        if (true) {
            this.cusSvrc.getFederationServer(pcntx.anchorUrl)
                .then((fedurl) => {
                    console.log("ReceivePage::receivePayment() fedurl: " + fedurl);
                })
                .catch((err) => {
                    console.log("ReceivePage::receivePayment() err: " + err);
                });
        }
    }

}
