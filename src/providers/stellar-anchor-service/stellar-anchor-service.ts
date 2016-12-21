import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { CommonService } from '../common-service/common-service';
import * as CommonConstants from '../common-service/common-service';

import * as StellarConstants from "../stellar-constants/stellar-constants";
import { StellarKeySettingsService } from '../stellar-key-settings-service/stellar-key-settings-service';
import * as StellarKeySettingsConstants from '../stellar-key-settings-service/stellar-key-settings-service';
import { StellarRemoteService } from '../stellar-remote-service/stellar-remote-service';

declare var StellarSdk: any;

/*
  Generated class for the StellarAnchorService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StellarAnchorService {
    // Config your server
    config: any = {};
    assets: any = [];

    constructor(private comSrvc: CommonService,
        private keysettings: StellarKeySettingsService,
        private srsSrvc: StellarRemoteService) {
    }

    isAssetNative(curr): boolean {
        if (curr === 'native' || curr === StellarConstants.NATIVE_CURRENCY_XLM || curr == null) {
            return true;
        } else {
            return false;
        }
    }

    // https://www.stellar.org/developers/guides/anchor.html
    configAnchorBaseAccount() {
        let self = this;

        this.config = {
            baseAccount: this.keysettings.getBaseKeys().address,
            baseAccountSeed: this.keysettings.getBaseKeys().secret
        };

        // You can use Stellar.org's instance of Horizon or your own
        this.config.horizon = this.srsSrvc.hostname;

        // Include the JS Stellar SDK
        // It provides a client-side interface to Horizon
        //var StellarSdk = require('stellar-sdk');

        // Initialize the Stellar SDK with the Horizon instance
        // you want to connect to
        let server = this.srsSrvc.getServer();

        // Specify the non-native assets you'll accept
        this.assets = [
            new StellarSdk.Asset(CommonConstants.AppCurrency[CommonConstants.AppCurrency.GHS], StellarKeySettingsConstants.ZOOMSIKA_DEV_KEYS),
            new StellarSdk.Asset(CommonConstants.AppCurrency[CommonConstants.AppCurrency.NGN], StellarKeySettingsConstants.ZOOMSIKA_DEV_KEYS),
            new StellarSdk.Asset(CommonConstants.AppCurrency[CommonConstants.AppCurrency.USD], StellarKeySettingsConstants.ZOOMSIKA_DEV_KEYS),
            new StellarSdk.Asset(CommonConstants.AppCurrency[CommonConstants.AppCurrency.XOF], StellarKeySettingsConstants.ZOOMSIKA_DEV_KEYS)]

        // Get the latest cursor position
        let lastToken = this.latestFromDB("StellarCursor");

        // Listen for payments from where you last stopped
        // GET https://horizon-testnet.stellar.org/accounts/{config.baseAccount}/payments?cursor={lastToken}
        let callBuilder = server.payments().forAccount(this.config.baseAccount);

        // If no cursor has been saved yet, don't add cursor parameter
        if (lastToken) {
            callBuilder.cursor(lastToken);
        }

        callBuilder.stream({ onmessage: this.handlePaymentResponse });

        // Load the account sequence number from Horizon and return the account
        // GET https://horizon-testnet.stellar.org/accounts/{config.baseAccount}
        server.loadAccount(this.config.baseAccount)
            .then((account) => {
                self.submitPendingTransactions(account);
            })
    }

    handlePaymentResponse(record) {
        // This callback will be called for sent payments too.
        // We want to process incoming payments only.
        if (record.to != this.config.baseAccount) {
            return;
        }

        // As an anchor, you shouldn't be getting native lumens
        if (this.isAssetNative(record.asset_code)) {
            return;
        }

        var paymentAsset = new StellarSdk.Asset(record.asset_code, record.issuer);

        if (!this.assets.contains(paymentAsset)) {
            // If you are an anchor for certain assets and the customer sends
            // you assets you don't accept, some options for handling it are
            // 1. Trade the asset to your asset and credit that amount
            // 2. Send it back to the customer
        }

        // GET https://horizon-testnet.stellar.org/transaction/{id of transaction this payment is part of}
        record.transaction()
            .then((txn) => {
                let customer = txn.memo;

                // Credit the customer in the memo field
                if (this.checkExists(customer, "ExchangeUsers")) {
                    // Update in an atomic transaction
                    this.update_in_db_transaction(() => {
                        // Store the amount the customer has paid you in your database
                        this.storeCustomerPymt([record.amount, customer, paymentAsset.getCode(), paymentAsset.getIssuer()], "StellarDeposits");
                        // Keep the cursor
                        this.storeCursor(record.paging_token, "StellarCursor");
                    });
                } else {
                    // If customer cannot be found, you can raise an error,
                    // add them to your customers list and credit them,
                    // or do anything else appropriate to your needs
                    console.log(customer);
                }
            })
            .catch(function (err) {
                // Process error
            });
    }

    update_in_db_transaction(transfunc) {
    }

    checkExists(customer, transtype) {
    }

    storeCustomerPymt([], transtype) {
    }

    storeCursor(record, transtype) {
    }

    updateRecord(msg, transtype) {
    }

    // This is the function that handles submitting a single transaction
    submitTransaction(sourceAccount, destinationAddress, amount, asset) {
        let self = this;
        let server = this.srsSrvc.getServer();

        // Update transaction state to sending so it won't be
        // resubmitted in case of the failure.
        this.updateRecord('sending', "StellarTransactions");

        // Check to see if the destination address exists
        // GET https://horizon-testnet.stellar.org/accounts/{destinationAccount}
        server.loadAccount(destinationAddress)
            // If so, continue by submitting a transaction to the destination
            .then((account) => {
                let transaction = new StellarSdk.Transaction(sourceAccount)
                    .addOperation(StellarSdk.Operation.payment({
                        destination: destinationAddress,
                        asset: asset,
                        amount: amount
                    }))
                    // Sign the transaction
                    .build();

                transaction.sign(StellarSdk.Keypair.fromSeed(self.config.baseAccountSeed));

                // POST https://horizon-testnet.stellar.org/transactions
                return server.submitTransaction(transaction)
                    .then((transactionResult) => {
                        this.updateRecord('done', "StellarTransactions");
                    })
                    .catch(function (err) {
                        // Catch errors, most likely with the network or your transaction.
                        // You may need to fetch the current sequence number of baseAccount account.
                        this.updateRecord('error', "StellarTransactions");
                    });
            })
            .catch(StellarSdk.NotFoundError, function (err) {
                // If destination cannot be found, you can raise an error,
                // because the account must exist and have a trustline.
                console.log(err);
            });
    }

    querySQL(querystr) {
    }

    // This function handles submitting all pending transactions, and calls the previous one
    // This function should be run in the background continuously
    submitPendingTransactions(sourceAccount) {
        // See what transactions in the DB are still pending
        let pendingTransactions: any = this.querySQL("SELECT * FROM StellarTransactions WHERE state =`pending`");

        while (pendingTransactions.length > 0) {
            //var txn = pendingTransactions.pop();

            // This function is async so it won't block. For simplicity we're using
            // ES7 `await` keyword but you should create a "promise waterfall" so
            // `setTimeout` line below is executed after all transactions are submitted.
            // If you won't do it will be possible to send a transaction twice or more.
            //await this.submitTransaction(sourceAccount, txn.destinationAddress, txn.amount, txn.asset);
        }

        // Wait 30 seconds and process next batch of transactions.
        setTimeout(() => {
            this.submitPendingTransactions(sourceAccount);
        }, 30 * 1000);
    }


    latestFromDB(cursor) {
    }

    getUserBalance(userID, assetCode, assetIssuer) {
    }

    handleRequestWithdrawal(userID, assetAmount, assetCode, assetIssuer, destinationAddress) {
        // This should be done in an atomic transaction
        this.update_in_db_transaction( () => {
            // Read the user's balance from the anchor's database
            let userBalance: any = this.getUserBalance('userID', assetCode, assetIssuer);

            // Check that user has the required amount
            if (assetAmount <= userBalance) {
                // Debit  the user's internal lumen balance by the amount of lumens they are withdrawing
                this.storeCustomerPymt([userID, userBalance - assetAmount, assetCode, assetIssuer], "UserBalances");
                // Save the transaction information in the StellarWithrawals table
                this.storeCustomerPymt([userID, destinationAddress, assetAmount, assetCode, assetIssuer, "pending"], "StellarPayments");
            } else {
                // If the user doesn't have required amount, you can alert them
            }
        });
    }

}

