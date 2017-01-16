import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the AppConfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppConfig {
    private _config: Object
    private _env: Object

    constructor(private http: Http) { }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get('assets/config/appenv.json')
                .subscribe(env_data => {
                    // Website takes this path
                    this._env = env_data;
                    //console.log('load() this._env: ' + JSON.stringify(this._env));
                    //console.log('load(Website) env_data.status: ' + JSON.stringify(env_data.status));
                    //console.log('load() env_data.headers: ' + JSON.stringify(env_data.headers));
                    //console.log('load() env_data.json(): ' + env_data.json());
                    resolve(env_data.json());
                },
                onerr => {
                    console.error('config loading error: ' + JSON.stringify(onerr))
                    reject(onerr);
                },
                () => { console.log('app-config loading completed') } );
        });
    }

    getEnv(key: any) {
        return this._env[key];
    }

    get(key: any) {
        return this._config[key];
    }

}

