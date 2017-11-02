export class Country {
    constructor(public code: string,
        public name: string,
        public localname: string) {
    }
}

export class DropDownListModel {
    constructor(public value: string,
        public label: string) {
    }
}

export class PartialReg {
    countryCode: string;
    policyCode: string;
    uplineMobileNumber: string;
    mobileNumber: string;
    constructor(countryCode: string,
        policyCode: string,
        uplineMobileNumber: string,
        mobileNumber: string) {
        this.countryCode = countryCode;
        this.policyCode = policyCode;
        this.uplineMobileNumber = uplineMobileNumber;
        this.mobileNumber = mobileNumber;
    }
}


export class User {
    clientregId: string;
    fname: string;
    lname: String;
    mname: string;
    email: string;
    phone: string;
    countryCode: string;
    username: string;
    password: string;
    ipaddress: string;
    latitude: string;
    longitude: string;
    passwordstrength: string;
    constructor(
        clientregId: string,
        fname: string,
        lname: String,
        mname: string,
        email: string,
        phone: string,
        countryCode: string,
        username: string,
        password: string,
        ipaddress: string,
        latitude: string,
        longitude: string,
        passwordstrength: string) {
        this.clientregId = clientregId;
        this.fname = fname;
        this.lname = lname;
        this.mname = mname;
        this.email = email;
        this.phone = phone;
        this.countryCode = countryCode;
        this.username = username;
        this.password = password;
        this.ipaddress = ipaddress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.passwordstrength = passwordstrength;
    }



}

