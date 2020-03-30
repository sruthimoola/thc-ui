import { Patient } from './patients.model';
import { Addresses } from './shared/address.model';


export class PatientService {


    private patients: Patient[] = [];

    constructor() {

    }


    getPatients()  {
        return this.patients.slice();
    }

    getPatient(index: number) {
        return this.patients[index];
    }



}
