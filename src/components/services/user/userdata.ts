import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage-service';

export const BASE_USER_DATA = 'baseUserData';

/*
  Author: Stephen Agyepong
*/

export interface IBaseUserData {
    username: string,
    clientreg_id?: string;
    fname?: string;
    mname?: string;
    lname?: string;
    companyname?: string;
    email?: string;
    phone?: string;
    country_code?: string;
    password?: string;
    ipaddress?: string;
    latitude?: string;
    longitude?: string;
    passwordstrength?: string;
};

@Injectable()
export class UserDataService {
   userdata: IBaseUserData;

   constructor(public storeSrvc: StorageService) {
   }

   saveData(data: IBaseUserData) {
       this.storeSrvc.saveData(BASE_USER_DATA, data);
   }

   getData(): IBaseUserData {
       this.storeSrvc.getData(BASE_USER_DATA).then((val) => {
           console.log('getData BASE_USER_DATA: ', val);
           let userdata: IBaseUserData = <IBaseUserData>val;
           return userdata;
       });

       return null;
   }

   removeData(): boolean {
       this.storeSrvc.removeData(BASE_USER_DATA).then((val) => {
           console.log('removeData BASE_USER_DATA: ', val);
           return true;
       });

       return false;
   }

   clearData(): boolean {
       this.storeSrvc.clearData().then((val) => {
           console.log('clearData BASE_USER_DATA: ', val);
           return true;
       });

       return false;
   }
}

export class BaseUserData implements IBaseUserData {

    constructor(
        public username,
        public clientreg_id?,
        public fname?,
        public mname?,
        public lname?,
        public companyname?,
        public email?,
        public phone?,
        public country_code?,
        public password?,
        public ipaddress?,
        public latitude?,
        public longitude?,
        public passwordstrength?
    ) {}
}