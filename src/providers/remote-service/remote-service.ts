import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';

/*
  Author: Stephen Agyepong
*/

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RemoteService {
    _data: any = null;
	_timeout: number = 3000;

    constructor(public http: Http) {
    }

    getHttp(url_p: string, options?: RequestOptionsArgs) {
        return new Promise((resolve, reject) => {
            let self = this;
            this.http.get(url_p, options)
                .subscribe(_data => {
                    self._data = _data;
                    //console.log('getHttp() this._data: ' + JSON.stringify(this._data));
                    //console.log('getHttp() _data.status: ' + JSON.stringify(_data.status));
                    //console.log('getHttp() _data.headers: ' + JSON.stringify(_data.headers));
                    //console.log('getHttp() _data.json(): ' + JSON.stringify(_data.json()));
                    resolve(_data.json());
                },
                onerr => {
                    console.error('getHttp() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                },
                () => {
                    //console.log('getHttp() completed');
                });
        });
    }

    postHttp(url_p: string, body_p: any, options?: RequestOptionsArgs) {
        return new Promise((resolve, reject) => {
            let self = this;
            this.http.post(url_p, body_p, options)
                .subscribe(_data => {
                    self._data = _data;
                    console.log('postHttp() _data.status: ' + JSON.stringify(_data.status));
                    console.log('postHttp() _data.headers: ' + JSON.stringify(_data.headers));
                    console.log('postHttp() this._data: ' + JSON.stringify(this._data));
                    console.log('postHttp() _data.json(): ' + JSON.stringify(_data.json()));
                    resolve(_data.json());
                },
                onerr => {
                    console.error('postHttp() error: ' + JSON.stringify(onerr));
                    reject(onerr);
                },
                () => { console.log('postHttp() completed') });
        });
    }

}

