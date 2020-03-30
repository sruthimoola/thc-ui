import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { PatientService } from 'src/app/patient.service';
import { Patient } from 'src/app/patients.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Table } from 'primeng/table/table';




@Component({
  selector: 'app-search-comp',
  templateUrl: './search-comp.component.html',
  styleUrls: ['./search-comp.component.css']
})
export class SearchCompComponent implements OnInit {

@Input() id: number;

patients: Patient[] = [];

cols: any[];

patientSearchForm: FormGroup;

@ViewChild('dt') table: Table;

patientCount = 0;

public searchMode: boolean;

flag = false;

constructor(private patientService: PatientService,
            private route: ActivatedRoute,
            private dataStorageService: DataStorageService) {

}
ngOnInit() {
  this.searchMode = false;
  this.initForm();
  this.cols = [
    { field: 'firstName', header: 'FirstName' },
    { field: 'lastName', header: 'LastName' },
    { field: 'dob', header: 'DateOfBirth' },
    { field: 'gender', header: 'Gender'},
    { field: 'phone', header: 'Phone #'}
  ];
}


private initForm() {
  const firstName = '';
  const lastName = '';
  const dob = '';
  const gender = '';
  const phone = '';
  // const postalCode = [];

  this.patientSearchForm = new FormGroup({
    firstName: new FormControl(firstName),
    lastName: new FormControl(lastName),
    dob: new FormControl(dob),
    gender: new FormControl(gender),
    phone: new FormControl(phone)
    // postalCode: new FormControl(postalCode)
  });

}

onSearch() {
  this.searchMode = true;
  // this.patientCount = 0;

  let c = 0;
  for (const field in this.patientSearchForm.controls) {
    if (this.patientSearchForm.get(field).value !== null
        && this.patientSearchForm.get(field).value !== '') {
          c++;
        }
  }

  if (c === 0) {
    return;
  }

  const firstName = this.patientSearchForm.controls.firstName.value ? this.patientSearchForm.controls.firstName.value : '*';
  const lastName = this.patientSearchForm.controls.lastName.value ? this.patientSearchForm.controls.lastName.value : '*';
  const dob = this.patientSearchForm.controls.dob.value ? this.patientSearchForm.controls.dob.value : '*';
  const gender = this.patientSearchForm.controls.gender.value ? this.patientSearchForm.controls.gender.value : '*';
  const phone = this.patientSearchForm.controls.phone.value ? this.patientSearchForm.controls.phone.value : '*';

  const patient = new Patient(firstName, lastName, dob, gender, phone);


  // let patientCount = 0;
  this.dataStorageService.getPatientCount()
    .subscribe(count => {
      this.patientCount = count;
      if (this.patientCount > 0) {
        this.dataStorageService.fetchPatients(patient, this.patientCount)
        .subscribe(res => {
          this.patients = [];
          res.forEach(result => {
            this.patients.push(result._source);
          });
          this.patientService.getPatients();
        });
      }
    });


    // this.dataStorageService.fetchAllPatients()
    // .subscribe(result => {
    //   this.patients = [];
    //   result.forEach(i => {
    //     // let pat: Patient = i._source;
    //     // if (pat !== undefined) {
    //       this.patients.push(i._source);
    //     // }
    //     // this.patients.slice();
    // });
    // });
    // // this.paginator.reset();
}

onAdd() {
  let patientCount = 0;
  this.dataStorageService.getPatientCount()
  .subscribe(result => {
    patientCount = result;
  });
  this.dataStorageService.storePatient(patientCount);
}

onClear() {
this.patients = [];
this.searchMode = false;
this.patientSearchForm.controls.firstName.setValue('');
this.patientSearchForm.controls.lastName.setValue('');
this.patientSearchForm.controls.dob.setValue('');
this.patientSearchForm.controls.gender.setValue('');
this.patientSearchForm.controls.phone.setValue('');
this.resetSort();
}

resetSort() {
  this.table.sortOrder = 0;
  this.table.sortField = '';
  this.table.reset();
}

}

