import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { CommonService } from '../common-service/common-service';
import { StellarRemoteService } from '../../providers/stellar-remote-service/stellar-remote-service';
import { StellarCommonService } from "../../providers/stellar-common-service/stellar-common-service";

declare var StellarSdk: any;

/*
  Author: Stephen Agyepong
*/
@Injectable()
export class StellarTrustlineService {

    constructor(private comSrvc: CommonService,
        private srsSrvc: StellarRemoteService,
        private scsSrvc: StellarCommonService) {
    }

    setAuthorization(issuingAccount, issuingKeys) {
        let server = this.srsSrvc.getServer();
        //let flags = StellarSdk.xdr.AccountFlags;
        let transaction = new StellarSdk.TransactionBuilder(issuingAccount)
            .addOperation(StellarSdk.Operation.setOptions({
                setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
            }))
            .build();
        transaction.sign(issuingKeys);
        server.submitTransaction(transaction);
    }

    // Because every transaction comes with a small fee, 
    // you might want to check to ensure an account has a trustline and 
    // can receive your asset before sending a payment. If an account has 
    // a trustline, it will be listed in the accounts balances (even if the balance is 0).
    checkTrust(assetCode, assetIssuer, clientAccountId) {
        let server = this.srsSrvc.getServer();

        //let astroDollarCode = 'AstroDollar';
        //let astroDollarIssuer = 'GC2BKLYOOYPDEFJKLKY6FNNRQMGFLVHJKQRGNSSRRGSMPGF32LHCQVGF';

        //let accountId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';
        server.loadAccount(clientAccountId).then(function (account) {
            let trusted = account.balances.some(function (balance) {
                return balance.asset_code === assetCode &&
                       balance.asset_issuer === assetIssuer;
            });

            console.log(trusted ? 'Trusted :)' : 'Not trusted :(');
        });
    }

    changeTrust(issuingAddr, signerSeed, asset_code, trustLimitAmt) {
        let server = this.srsSrvc.getServer();

        // Keys for accounts to issue and receive the new asset
        //var issuingKeys = StellarSdk.Keypair.fromSecret(issuingSeed);
        let signerKeys = StellarSdk.Keypair.fromSecret(signerSeed);
        console.log('StellarTrustlineService::changeTrust() signerKeys: ' + signerKeys );

        // First, the receiving account must trust the asset
        let issuedAsset = this.scsSrvc.getAssetObject(asset_code, issuingAddr);
        console.log('StellarTrustlineService::changeTrust() issuedAsset: ' + issuedAsset);
        
        server.loadAccount(signerKeys.publicKey())
            .then(function (receiver) {
                let transaction = new StellarSdk.TransactionBuilder(receiver)
                    // The `changeTrust` operation creates (or alters) a trustline
                    // The `limit` parameter below is optional
                    .addOperation(StellarSdk.Operation.changeTrust({
                        asset: issuedAsset,
                        limit: trustLimitAmt
                    }))
                    .build();
                transaction.sign(signerKeys);
                return server.submitTransaction(transaction);
            })
    }

    changeTrustAndPay(issuingAddr, issuingSeed: string, receivingSeed: string, asset_code, trustLimitAmt, pymtAmt: string) {
        let server = this.srsSrvc.getServer();

        // Keys for accounts to issue and receive the new asset
        let issuingKeys = StellarSdk.Keypair.fromSecret(issuingSeed);
        let receivingKeys = StellarSdk.Keypair.fromSecret(receivingSeed);

        // First, the receiving account must trust the asset
        let issuedAsset = this.scsSrvc.getAssetObject(asset_code, issuingAddr);
        
        server.loadAccount(receivingKeys.accountId())
            .then(function (receiver) {
                let transaction = new StellarSdk.TransactionBuilder(receiver)
                    // The `changeTrust` operation creates (or alters) a trustline
                    // The `limit` parameter below is optional
                    .addOperation(StellarSdk.Operation.changeTrust({
                        asset: issuedAsset,
                        limit: trustLimitAmt
                    }))
                    .build();
                transaction.sign(receivingKeys);
                return server.submitTransaction(transaction);
            })

            // Second, the issuing account actually sends a payment using the asset
            .then(function () {
                return server.loadAccount(issuingKeys.accountId())
            })
            .then(function (issuer) {
                let transaction = new StellarSdk.TransactionBuilder(issuer)
                    .addOperation(StellarSdk.Operation.payment({
                        destination: receivingKeys.accountId(),
                        asset: issuedAsset,
                        amount: pymtAmt
                    }))
                    .build();
                transaction.sign(issuingKeys);
                return server.submitTransaction(transaction);
            })
            .catch(function (error) {
                console.error('changeTrustAndPay() Error!', error);
            });
    }

}

