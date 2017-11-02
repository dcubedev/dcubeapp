import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { CryptoJSService } from '../security/cryptojs';


/*
  Author: Stephen Agyepong
*/

@Injectable()
export class StorageService {

    constructor(public storage: Storage, public cryptoSrvc: CryptoJSService) {
    }

    saveDataEncrypt(key: string, data: any) {
        let encryptedData = this.cryptoSrvc.encrypt(data);
        this.storage.set(key, encryptedData );
    }

    getEncryptedData(key: string) {
        return new Promise( (resolve, reject) => {
            this.storage.get(key).then((val) => {
                console.log('getData: ', val);
                let decryptedData = this.cryptoSrvc.decrypt(val);
                resolve(decryptedData);
            },
            onerr => {
                    console.error('getEncryptedData() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                }
        );
        });
    }

    saveDataEncryptWithKey(key: string, data: string, encryptkey: string) {
        let encryptedData = this.cryptoSrvc.encryptWithKey(data, encryptkey);
        this.storage.set(key, encryptedData);
    }

    getEncryptedDataWithKey(key: string, encryptkey: string) {
        return new Promise((resolve, reject) => {
            this.storage.get(key).then((val) => {
                console.log('getData: ', val);
                let decryptedData = this.cryptoSrvc.decryptWithKey(val, encryptkey);
                resolve(decryptedData);
            },
                onerr => {
                    console.error('getEncryptedData() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                }
            );
        });
    }

    saveData(key: string, data: any) {
        this.storage.set(key, data);
    }

    getData(key: string) {
        return new Promise((resolve, reject) => {
            this.storage.get(key).then((val) => {
                console.log('getData: ', val);
                resolve(val);
            },
            onerr => {
                    console.error('getData() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                }
        );
        });
    }

    removeData(key: string) {
        return new Promise((resolve, reject) => {
            this.storage.remove(key).then((val) => {
                console.log('removeData: ', val);
                resolve( true );
            },
            onerr => {
                    console.error('removeData() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                }
        );
        });
    }

    clearData() {
        return new Promise((resolve, reject) => {
            this.storage.clear().then((val) => {
                console.log('clearData: ', val);
                resolve(true);
            },
            onerr => {
                    console.error('clearData() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                }
        );
        });
    }

}