import { Addresses } from './shared/address.model';

export class Patient {
    public pId: string;
    public firstName: string;
    public lastName: string;
    public dob: string;
    public gender: string;
    public phone: number;
    // public address: Addresses[];

    // constructor(pId?: string, fname?: string, lname?: string, dob?: string, gender?: string, phone?: number) {
    //     this.pId = pId;
    //     this.firstName = fname;
    //     this.lastName = lname;
    //     this.dob = dob;
    //     this.gender = gender;
    //     this.phone = phone;
    //     // this.address = address;
    // }

    constructor(pId: string, fname: string, lname: string, dob: string, gender: string, phone: number) {
        this.pId = pId;
        this.firstName = fname;
        this.lastName = lname;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
        // this.address = address;
    }

}
