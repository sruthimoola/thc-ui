import { Patient } from './patients.model';

export class PatientService {


    private patients: Patient[] = [];

    constructor() {

    }


    getPatients()  {
        return this.patients.slice();
    }

    getPatient(id: number) {
    }



}
