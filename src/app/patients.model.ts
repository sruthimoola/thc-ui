import { Addresses } from './shared/address.model';

export class Patient {
    public firstName: string;
    public lastName: string;
    public dob: string;
    public gender: string;
    public phone: number;
    // public address: Addresses[];

    constructor(fname: string, lname: string, dob: string, gender: string, phone: number) {
        this.firstName = fname;
        this.lastName = lname;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
        // this.address = address;
    }
}
