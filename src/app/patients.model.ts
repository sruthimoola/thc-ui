export class Patient {
    public pId: string;
    public firstName: string;
    public lastName: string;
    public dob: string;
    public gender: string;
    public phone: number;

    constructor(pId: string, fname: string, lname: string, dob: string, gender: string, phone: number) {
        this.pId = pId;
        this.firstName = fname;
        this.lastName = lname;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
    }

}
