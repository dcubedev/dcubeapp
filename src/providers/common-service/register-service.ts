import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs';

// dcubedev imports
import * as AppConstants from '../app-constants/app-constants';
import * as Models from '../models/models';
/*
  Author: Stephen Agyepong
*/

/*
  Generated class for the CommonService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RegisterService {
    isMobile: boolean = false;
    url_dcube: string = AppConstants.URL_DEV_DCUBE;
    url_scom: string = AppConstants.URL_DEV_SCOM;
    users: Models.User[];
    postResponse: any;

    constructor(
        private http: Http) {
        this.users = [];
    }

    getIp(): any {
        let apiURL = `https://api.ipify.org?format=json`;
        return this.http.get(apiURL).map(res => res.json());
    }

    getIPAddress() {
        let apiURL = `https://httpbin.org/ip`;
        return this.http.get(apiURL).map(res => res.json());
    }

    getMovies(): Observable<Models.Country[]> {
        let apiURL = `${this.url_dcube}rest/mysql/getCountriesJpaMysql`;
        return this.http.get(apiURL)
            .map((response: Response) => <Models.Country[]>response.json())
            .do(data => console.log("All: " + JSON.stringify(data)))
            .catch(this.handleServerError);
    }

    getCountries(): Observable<Models.DropDownListModel[]> {
        let apiURL = `${this.url_dcube}rest/mysql/getCountriesJpaMysql`;
        return this.http.get(apiURL).map(res => res.json())
            .catch(this.handleServerError);
    }

    getUserByClientId(term: string): any {
        let apiURL = `${this.url_dcube}rest/neo4j/getRegUserByClientregId?clientregId=` + term;

        return this.http.get(apiURL)
            .map((response: Response) => response.json())
            .map(({ clientregId, fname, lname }) => new Models.User(
                clientregId, fname, lname, "",
                "", "", "", "",
                "", "", "", "", ""
            ))
            .catch(this.handleServerError);
    }

    getUsersList(): any {
        let apiURL = `${this.url_dcube}rest/neo4j/getRegUsers`;

        /* return this.http.get(apiURL)
             .map((response: Response) => response.json())
             .map(({ clientregId, fname, lname, mname, email, phone, countryCode, username, latitude, longitude }) => new Models.User(
                 clientregId, fname, lname, mname, email,
                 phone, countryCode, username,
                 "", "", latitude, longitude, ""
             ))
             .catch(this.handleServerError);*/

        return this.http.get(apiURL).map(res => res.json())
            .catch(this.handleServerError);
    }



    getUserById(term: number): any {
        let apiURL = `${this.url_dcube}rest/neo4j/getRegUser?gid=` + term;

        return this.http.get(apiURL)
            .map((response: Response) => response.json())
            .map(({ clientregId, fname, lname, mname, email, phone,
                countryCode, username, latitude, longitude }) => new Models.User(
                    clientregId, fname, lname, mname, email,
                    phone, countryCode, username,
                    "", "", latitude, longitude, ""
                ))
            .catch(this.handleServerError);
    }


    register(user: Models.User): any {
        let postUrl = this.url_dcube + 'rest/neo4j/insertRegUser';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(postUrl, JSON.stringify(user), { headers: headers })
            .subscribe(res => {
                console.log(res.json());
                this.postResponse = res.json();
            }, (err) => {
                console.log(err);
            });

    }

    private handleServerError(error: Response) {
        console.log("Server Error | " + error)
        return Observable.throw(error || 'Server error'); // Observable.throw() is undefined at runtime using Webpack
    }

}

