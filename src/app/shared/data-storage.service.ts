import { Injectable } from '@angular/core';
import { PatientService } from '../patient.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Patient } from '../patients.model';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {


    constructor(private patientService: PatientService,
                private http: HttpClient) {}

    storePatient(patientCount: number) {
        throw new Error('Method not implemented.');
      }


    fetchPatients(patient: Patient, patientCount: number) {
        const params = {
            query: {
                bool: {
                    must: [{
                        query_string: {
                            default_field: 'firstName',
                            query: patient.firstName
                        }
                    }, {
                        query_string: {
                            default_field: 'lastName',
                            query: patient.lastName
                        }
                    }, {
                        query_string: {
                            default_field: 'gender',
                            query: patient.gender
                        }
                    }, {
                        query_string: {
                            default_field: 'dob',
                            query: patient.dob
                        }
                    }, {
                        query_string: {
                            default_field: 'phone',
                            query: patient.phone
                        }
                    }]
                }
            },
            from: 0,
            size: patientCount
        };
        return this.http.post('http://localhost:9200/patients/patient/_search', params, {headers})
        .pipe(map(data => {
            // tslint:disable-next-line:no-string-literal
            let x: any;
            x = data;
            const res = x.hits.hits;
            // console.log(res);
            return res;
        }));
    }

    // fetchAllPatients() {
    //     return this.http.get('http://localhost:9200/_search?size=50', {headers})
    //     .pipe(map(data => {
    //         // tslint:disable-next-line:no-string-literal
    //         let x: any;
    //         x = data;
    //         const res = x.hits.hits;
    //         // console.log(res);
    //         return res;
    //     }));
    // }

    getPatientCount() {
        return this.http.get('http://localhost:9200/_count')
        .pipe(map(data => {
            let x: any;
            x = data;
            const res: number = x.count;
            return res;
        }));
    }

    addPatient(patient: Patient) {
        return this.http.post('http://localhost:9200/patients/patient/',
        patient,
        {headers})
        .subscribe(res => {
            console.log(res);
        });
    }

}