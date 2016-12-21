import { Injectable } from '@angular/core';

import { StellarTrustlineService } from '../../providers/stellar-trustline-service/stellar-trustline-service';


/*
  Author: Stephen Agyepong
*/
@Injectable()
export class TrustService {

    constructor(private stsSrvc: StellarTrustlineService) {
    }

    setAuthorization(issuingAccount, issuingKeys) {
        this.stsSrvc.setAuthorization(issuingAccount, issuingKeys);
    }

    // Because every transaction comes with a small fee, 
    // you might want to check to ensure an account has a trustline and 
    // can receive your asset before sending a payment. If an account has 
    // a trustline, it will be listed in the accounts balances (even if the balance is 0).
    checkTrust(assetCode, assetIssuer, clientAccountId) {
        this.stsSrvc.checkTrust(assetCode, assetIssuer, clientAccountId);
    }

    changeTrust(issuingAddr, issuingSeed, receivingSeed, asset_code, trustLimitAmt) {
        this.stsSrvc.changeTrust(issuingAddr, issuingSeed, receivingSeed, asset_code, trustLimitAmt);
    }

    changeTrustAndPay(issuingAddr, issuingSeed: string, receivingSeed: string, asset_code, trustLimitAmt, pymtAmt: string) {
        this.stsSrvc.changeTrustAndPay(issuingAddr, issuingSeed, receivingSeed, asset_code, trustLimitAmt, pymtAmt);
    }

}

