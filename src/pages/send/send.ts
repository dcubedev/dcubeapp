import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import * as AppConstants from '../../providers/app-constants/app-constants';
import * as CommonConstants from '../../providers/common-service/common-service';
import { CommonService } from '../../providers/common-service/common-service';
import { CommonUtilsService } from '../../providers/platform/stellar/common-utils-service';
import { AccountService } from '../../providers/platform/stellar/account-service';

/*
  Author: Stephen Agyepong

    This component allows the user to send assets (currency, etc)
*/


@Component({
    templateUrl: 'send.html'
})
export class SendPage {
    pnames: string[];
    pmthds: string[];
    currencies: string[];
    selectedPname: string;
    selectedPmthds: string;
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
        private acctSvrc: AccountService,
        private cusSvrc: CommonUtilsService) {
        this.init();
    }

    ngOnInit() {
        this.commonSvrc.initAccount(this);
        this.commonSvrc.initPaymentData(this);
        this.pnames = this.commonSvrc.getPlatformContextPnames();
        this.pmthds = this.commonSvrc.getPymtMthdContextPmthds();
        this.currencies = this.commonSvrc.getCurrenciesCname();
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

        this.commonSvrc.initPaymentData(this);

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

    anotheracct() {
    }

    sendPayment() {
        console.log("SendPage::sendPayment() this.selectedPname: " + this.selectedPname);
        let pcntx: CommonConstants.IPlatformContext = this.commonSvrc.findPlatformContext(this.selectedPname);
        console.log("SendPage::sendPayment(findPlatformContext) pcntx.anchorUrl: " + pcntx.anchorUrl);
        let tomlurl = pcntx.anchorUrl + '/.well-known/stellar.toml';
        console.log("SendPage::sendPayment() tomlurl: " + tomlurl);

        if (true) {
            this.cusSvrc.getFederationServer(pcntx.anchorUrl)
                .then((fedurl) => {
                    console.log("SendPage::sendPayment() fedurl: " + fedurl);
                })
                .catch((err) => {
                    console.log("SendPage::sendPayment() err: " + err);
                });
        }
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
