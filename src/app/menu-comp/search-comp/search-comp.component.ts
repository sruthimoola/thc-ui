import { Component, OnInit, ViewChild, Input } from '@angular/core';


import { PatientService } from 'src/app/patient.service';
import { Patient } from 'src/app/patients.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Table } from 'primeng/table/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Treatment } from '../../treatment.model';
import { TreatmentService } from 'src/app/treatment.service';

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
treatments: Treatment[] = [];
displayModal: boolean;
itemsSymptoms = [];
selectedSymptoms = [];
itemsMedications = [];
selectedMedications = [];
// dropdownSymptomsSettings = {};

constructor(private patientService: PatientService,
            private route: ActivatedRoute,
            private dataStorageService: DataStorageService,
            private spinner: NgxSpinnerService,
            private treatmentService: TreatmentService) {

}
ngOnInit() {
  this.searchMode = false;
  this.initForm();
  this.cols = [
    { field: 'firstName', header: 'First Name', display: 'table-cell' },
    { field: 'lastName', header: 'Last Name', display: 'table-cell' },
    { field: 'dob', header: 'Date Of Birth', display: 'table-cell' },
    { field: 'gender', header: 'Gender', display: 'table-cell' },
    { field: 'phone', header: 'Phone #', display: 'table-cell' }
  ];
  this.onSearch();

}

private initForm() {
  const pId = '';
  const firstName = '';
  const lastName = '';
  const dob = '';
  const gender = '';
  const phone = '';
  // const postalCode = [];

  this.patientSearchForm = new FormGroup({
    pId: new FormControl(pId),
    firstName: new FormControl(firstName),
    lastName: new FormControl(lastName),
    dob: new FormControl(dob),
    gender: new FormControl(gender),
    phone: new FormControl(phone, Validators.maxLength(10))
    // postalCode: new FormControl(postalCode)
  });

}

onSearch() {
  this.spinner.show();
  let c = 0;
  for (const field in this.patientSearchForm.controls) {
    if (this.patientSearchForm.get(field).value !== null
        && this.patientSearchForm.get(field).value !== '' || field === 'gender') {
          c++;
        }
  }

  if (c === 0) {
    this.searchMode = true;
    this.spinner.hide();
    return;
  }

  const pId = this.patientSearchForm.controls.pId.value ? this.patientSearchForm.controls.pId.value : '*';
  const firstName = this.patientSearchForm.controls.firstName.value ? this.patientSearchForm.controls.firstName.value : '*';
  const lastName = this.patientSearchForm.controls.lastName.value ? this.patientSearchForm.controls.lastName.value : '*';
  const dob = this.patientSearchForm.controls.dob.value ? this.patientSearchForm.controls.dob.value : '*';
  // const gender = this.patientSearchForm.controls.gender.value ? this.patientSearchForm.controls.gender.value : '*';
  const gender = 'Male';
  const phone = this.patientSearchForm.controls.phone.value ? this.patientSearchForm.controls.phone.value : '*';

  const patient = new Patient(pId, firstName, lastName, dob, gender, phone);

  // let patientCount = 0;

  setTimeout(() => {
    this.dataStorageService.getPatientCount()
    .subscribe(count => {
      this.patientCount = count;
      if (this.patientCount > 0) {
        this.dataStorageService.fetchPatients(patient, this.patientCount)
        .subscribe(res => {
          this.patients = [];
          res.forEach(result => {
            this.patients.push(new Patient(result._id, result._source.firstName,
              result._source.lastName,
              result._source.dob,
              result._source.gender,
              result._source.phone));
          });
          this.patientService.getPatients();
        });
      }
    });
    this.searchMode = true;
    this.spinner.hide();
  }, 2000);

}

// onSearchAllPatients() {
//   this.dataStorageService.fetchAllPatients()
//   .subscribe(result => {
//   this.patients = [];
//   result.forEach(i => {
//     const pat: Patient = i._source;
//     if (pat !== undefined) {
//       this.patients.push(i._source);
//     }
//     this.patients.slice();
//     });
//     });
// }

  onRowEditInit(patient: Patient) {
  console.log('Row edit initialized!');

}

  onRowEditSave(patient: Patient) {
  // console.log('Row edit saved!');
  this.dataStorageService.updatePatient(patient)
  .subscribe(() => {
    console.log('Success!');
  });
  }


  onRowEditCancel(patient: Patient, index: number) {
  console.log('Row edit cancelled!');
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
    this.patientSearchForm.controls.pId.setValue('');
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

  getAllTreatments() {
  this.treatments = this.treatmentService.getTreatments();
  this.itemsSymptoms = this.treatmentService.dropdownSymptoms;
  this.selectedSymptoms = this.treatmentService.selectedSymptoms;
  this.itemsMedications = this.treatmentService.dropdownMedications;
  this.selectedMedications = this.treatmentService.selectedMedications;
  // this.dropdownSymptomsSettings = this.treatmentService.dropdownSettings;
}

// onSymptomItemSelect(item: any) {
//   return this.treatmentService.onItemSelect(item);
// }
// onSelectAllSymptoms(items: any) {
//   return this.treatmentService.onSelectAll(items);
// }

showModalNotes() {
  this.displayModal = true;
}

}
