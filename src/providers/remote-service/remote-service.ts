import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http';
//import { ResponseContentType } from '@angular/http';

import { Http } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http';
import { Headers, RequestMethod } from '@angular/http';

//import { Observable } from "rxjs/Observable";


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

    constructor(public httpOld: Http) {
    }
   
    getBasicEncodedCredentials(user, password) {
      let token = user + ":" + password;

      // Base64 Encoding -> btoa
      let encodedCredentials = btoa(token);

      return "Basic " + encodedCredentials;
    }

    getTokenCredentials(user, password, apikey?: string) {
      let _key;
      let _value;
      let resptoken;
      if ((undefined != apikey) && (null != apikey) && (apikey.length > 1)) {
        _key = 'api_key';
        _value = apikey;
        resptoken = { 'key': _key, 'value': _value };
      } else {
        _key = 'Authorization';
        _value = this.getBasicEncodedCredentials(user, password);
        resptoken = { 'key': _key, 'value': _value };
      }

      return resptoken;
    }

    getBearerCredentials(secret: string) {
      let _key = 'Authorization';
      let _value = "Bearer " + secret;
      let resptoken = { 'key': _key, 'value': _value };

      return resptoken;
    }

    getRequestOptionsArgs(reqMeth: RequestMethod, apikey_p?: string, contentType?: string): RequestOptionsArgs {
      let username = "john.doe";
      let password = "moqui";

      let token = this.getTokenCredentials(username, password, apikey_p);

      let _contentType = 'application/json';
      //let contentType = 'application/text';
      //let contentType = 'application/x-www-form-urlencoded';
      if ((undefined != contentType) && (null != contentType) && (contentType.length > 1)) {
        _contentType = contentType;
      }

      let headers = new Headers();
      headers.append('Content-Type', _contentType);
      headers.append(token.key, token.value);

      var reqOptions: RequestOptionsArgs = {
        method: reqMeth,
        headers: headers
      };

      return reqOptions;
    }

    // Using old http
    getHttpOld(url_p: string, apikey_p?: string) {
      console.log('getHttpOld() apikey: ' + apikey_p);
      return new Promise((resolve, reject) => {
        let self = this;

        let reqOptions: RequestOptionsArgs = this.getRequestOptionsArgs(RequestMethod.Get, apikey_p);
        this.httpOld.get(url_p, reqOptions)
          .subscribe(_data => {
            self._data = _data;
            //console.log('getHttpOld() this._data: ' + JSON.stringify(this._data));
            //console.log('getHttpOld() _data.status: ' + JSON.stringify(_data.status));
            //console.log('getHttpOld() _data.headers: ' + JSON.stringify(_data.headers));
            //console.log('getHttpOld() _data.json(): ' + JSON.stringify(_data.json()));
            //console.log('RemoteService::getHttpOld() _data.text(): ' + _data.text());
            //console.log('RemoteService::getHttpOld() _data: ' + _data);
            //console.log('RemoteService::getHttpOld() _data.text(): ' + _data.text());
            if ((undefined != _data) && (null != _data) && ("" != _data.text())) {
              resolve(_data.json());
            } else {
              resolve({});
            }
          },
          onerr => {
            console.error('getHttpOld() error: ' + JSON.stringify(onerr));
            reject(onerr);
          },
          () => {
            //console.log('getHttpOld() completed');
          });
      });
    }

    getHttpOldText(url_p: string, apikey_p?: string) {
      console.log('getHttpOldText() apikey: ' + apikey_p);
      return new Promise((resolve, reject) => {
        let self = this;
        let reqOptions: RequestOptionsArgs = this.getRequestOptionsArgs(RequestMethod.Get, apikey_p);
        this.httpOld.get(url_p, reqOptions)
          .subscribe(_data => {
            self._data = _data;
            //console.log('getHttpOldText() this._data: ' + JSON.stringify(this._data));
            //console.log('getHttpOldText() _data.status: ' + JSON.stringify(_data.status));
            //console.log('getHttpOldText() _data.headers: ' + JSON.stringify(_data.headers));
            //console.log('getHttpOldText() _data.json(): ' + JSON.stringify(_data.json()));
            //console.log('RemoteService::getHttpOldText() _data.text(): ' + _data.text());
            console.log('RemoteService::getHttpOldText() _data: ' + _data);
            if ((undefined != _data) && (null != _data)) {
              resolve(_data.text());
            } else {
              resolve("");
            }
          },
          onerr => {
            console.error('getHttpOldText() error: ' + JSON.stringify(onerr));
            reject(onerr);
          },
          () => {
            //console.log('getHttpOldText() completed');
          });
      });
    }

    putHttpOld(url_p: string, body_p: any, apikey_p?) {
      return new Promise((resolve, reject) => {
        let self = this;
        let reqOptions: RequestOptionsArgs = this.getRequestOptionsArgs(RequestMethod.Put, apikey_p);

        console.log('putHttpOld(request) body_p: ' + JSON.stringify(body_p));
        console.log('putHttpOld(request) reqOptions: ' + JSON.stringify(reqOptions));
        this.httpOld.put(url_p, body_p, reqOptions)
          .subscribe(_data => {
            self._data = _data;
            console.log('putHttpOld() _data.status: ' + JSON.stringify(_data.status));
            console.log('putHttpOld() _data.headers: ' + JSON.stringify(_data.headers));
            console.log('putHttpOld() this._data: ' + JSON.stringify(this._data));
            console.log('putHttpOld() _data.json(): ' + JSON.stringify(_data.json()));
            resolve(_data.json());
          },
          onerr => {
            console.error('putHttpOld() error: ' + JSON.stringify(onerr));
            reject(onerr);
          },
          () => { console.log('putHttpOld() completed') });
      });
    }

    postHttpOld(url_p: string, body_p: any, apikey_p?) {
      return new Promise((resolve, reject) => {
        let self = this;
        let reqOptions: RequestOptionsArgs = this.getRequestOptionsArgs(RequestMethod.Post, apikey_p);

        console.log('postHttpOld(request) body_p: ' + JSON.stringify(body_p));
        console.log('postHttpOld(request) reqOptions: ' + JSON.stringify(reqOptions));
        this.httpOld.post(url_p, body_p, reqOptions)
          .subscribe(_data => {
            self._data = _data;
            //console.log('postHttpOld() _data.status: ' + JSON.stringify(_data.status));
            //console.log('postHttpOld() _data.headers: ' + JSON.stringify(_data.headers));
            //console.log('postHttpOld() this._data: ' + JSON.stringify(this._data));
            //console.log('postHttpOld() _data.json(): ' + JSON.stringify(_data.json()));
            resolve(_data.json());
          },
          onerr => {
            console.error('postHttpOld() error: ' + JSON.stringify(onerr));
            reject(onerr);
          },
          () => { console.log('postHttpOld() completed') });
      });
    }

    postHttpOldText(url_p: string, body_p: any, apikey_p?) {
      return new Promise((resolve, reject) => {
        let self = this;
        let reqOptions: RequestOptionsArgs = this.getRequestOptionsArgs(RequestMethod.Post, apikey_p);

        console.log('postHttpOldText(request) body_p: ' + JSON.stringify(body_p));
        console.log('postHttpOldText(request) reqOptions: ' + JSON.stringify(reqOptions));
        this.httpOld.post(url_p, body_p, reqOptions)
          .subscribe(_data => {
            self._data = _data;
            console.log('postHttpOldText() _data.text(): ' + _data.text());
            resolve(_data.text());
          },
          onerr => {
            console.error('postHttpOldText() error: ' + JSON.stringify(onerr));
            reject(onerr);
          },
          () => { console.log('postHttpOldText() completed') });
      });
    }

    deleteHttpOld(url_p: string, msgBody, apikey_p?) {
      return new Promise((resolve, reject) => {
        let self = this;
        let reqOptions: RequestOptionsArgs = this.getRequestOptionsArgs(RequestMethod.Delete, apikey_p);

        console.log('deleteHttpOld(request) reqOptions: ' + JSON.stringify(reqOptions));
        this.httpOld.post(url_p, msgBody, reqOptions)
          .subscribe(_data => {
            self._data = _data;
            console.log('deleteHttpOld() _data.status: ' + JSON.stringify(_data.status));
            console.log('deleteHttpOld() _data.headers: ' + JSON.stringify(_data.headers));
            console.log('deleteHttpOld() this._data: ' + JSON.stringify(this._data));
            console.log('deleteHttpOld() _data.json(): ' + JSON.stringify(_data.json()));
            resolve(_data.json());
          },
          onerr => {
            console.error('deleteHttpOld() error: ' + JSON.stringify(onerr));
            reject(onerr);
          },
          () => { console.log('deleteHttpOld() completed') });
      });
    }

    getHttp(url_p: string, options?: RequestOptionsArgs) {
      return new Promise((resolve, reject) => {
        let self = this;
        this.httpOld.get(url_p, options)
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
        this.httpOld.post(url_p, body_p, options)
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

