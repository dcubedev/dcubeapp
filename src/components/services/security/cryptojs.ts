import { Injectable } from '@angular/core';

import CryptoJS from 'crypto-js';

//declare var require: any;

const ENCRYPTION_KEY = 'AA9F34324488652E7BA836768DCE9';

/*
  Author: Stephen Agyepong
*/

@Injectable()
export class CryptoJSService {
    //AES: any;
    //SHA256: any;

    constructor() {
        //this.AES = require("crypto-js/aes");
        //this.SHA256 = require("crypto-js/sha256");
        //console.log("CryptoJSService::constructor() this.AES: " + this.AES);
        //console.log("CryptoJSService::constructor() this.SHA256: " + this.SHA256);
        //console.log("========CryptoJS==========================================");
        //console.dir(CryptoJS);
    }

    public encrypt(plaintext: string): string {
        let ciphertext: Crypto = CryptoJS.AES.encrypt(plaintext, ENCRYPTION_KEY);
        return ciphertext.toString();
    }

    public decrypt(ciphertext: string): string {
        let plaintext = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
        return plaintext.toString(CryptoJS.enc.Utf8);
    }

    public encryptWithKey(plaintext: string, key: string): string {
        let ciphertext: Crypto = CryptoJS.AES.encrypt(plaintext, key);
        return ciphertext.toString();
    }

    public decryptWithKey(ciphertext: string, key: string): string {
        let plaintext = CryptoJS.AES.decrypt(ciphertext, key);
        return plaintext.toString(CryptoJS.enc.Utf8);
    }

}