import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';
import { AccountService } from '../../providers/platform/stellar/account-service';

/*
  Author: Stephen Agyepong

    This component allows the user to send assets (currency, etc)
*/


@Component({
    templateUrl: 'send.html'
})
export class SendPage {
    showDestTag: boolean = true;

    accountBalances: CommonConstants.IAccountBalance[] = null;
    destInfo: CommonConstants.IDestinationInfo;
    paymentData: CommonConstants.IPaymentData;
    transactionContext: CommonConstants.ITransactionContext;

    constructor(public navCtrl: NavController,
        public menuCtrl: MenuController,
        private translateService: TranslateService,
        private barcodeScanner: BarcodeScanner,
        private commonSvrc: CommonService,
        private acctSvrc: AccountService) {
        this.init();
    }

    ngOnInit() {
        this.acctSvrc.onAccountEvent(this, this.onAccountEvent);
        this.getAccountBalances();
    }

    init() {
        this.destInfo = {
            accountId: '',
            memo: null,
            memoType: null,
            isValidAddress: false,
            needFunding: false,
            acceptedCurrencies: ['XLM'],
            acceptedIOUs: []
        };

        this.paymentData = {
            destAddress: '',
            destTag: null,
            amount: 0,
            asset_code: 'XLM'
        };

        this.transactionContext = {
            isDirty: false,
            isValidCurrency: false,
            alternatives: [],
            choice: [],
            amount: 0
        };
    }

    onAccountEvent(self, acctevt: any) {
        //console.log("send::onAccountEvent() acctevt.memo: " + acctevt.memo);
        if (undefined !== self.acctSvrc && null !== self.acctSvrc) {
            self.account = self.acctSvrc.getAccount();
        }

        if (AppConstants.ACCT_INFO_LOADED === acctevt.memo) {
            self.accountBalances = <CommonConstants.IAccountBalance[]>acctevt.status;
        }
    }

    sendPayment() {
    }

    scanCode() {
        let resultDisplayDuration: number = 500;
        let orientation: "landscape";
        let prompt: "Please place a barcode inside the scan area";
        let formats: "QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED,AZTEC,PDF_417";

        this.barcodeScanner.scan({
            preferFrontCamera: true,
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            prompt: prompt, // Android
            resultDisplayDuration: resultDisplayDuration, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: formats,
            orientation: orientation, // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true,
            disableSuccessBeep: false // iOS
        }).then((barcodeData) => {
            // Success! Barcode data is here
            //console.log("SendPage::scanCode() barcodeData.text: " + barcodeData.text);
            //console.log("SendPage::scanCode() barcodeData.format: " + barcodeData.format);
            //console.log("SendPage::scanCode() barcodeData.cancelled: " + barcodeData.cancelled);
            //console.log("SendPage::scanCode() barcodeData: " + JSON.stringify(barcodeData));
            this.paymentData.destAddress = barcodeData.text;
            this.paymentData.destTag = barcodeData.format;
            this.destInfo.extraMemo = barcodeData.cancelled;
        }, (err) => {
            // An error occurred
            console.log("SendPage::scanCode() An error occurred err: " + err);
        });
    }

    encodeText() {
        let type = 'QR_CODE';
        //let type = cordova.plugins.barcodeScanner.Encode.TEXT_TYPE;
        let data = this.paymentData.amount;
        this.barcodeScanner.encode(type, data);
    }

    donate() {
    }

    toggleLeftMenu() {
        this.menuCtrl.toggle('left');
    }

    toggleRightMenu() {
        this.menuCtrl.toggle('right');
    }

    getAccountBalances() {
        //console.log("SendPage::getAccountBalances() acctevt.memo: " + acctevt.memo);
        this.acctSvrc.getAccountBalances();
    }

    translateString(key: string): string {
        return this.translateService.instant(key);
    }

}
