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
addTreatmentForm: FormGroup;
@ViewChild('dt') table: Table;
patientCount = 0;
public searchMode: boolean;
treatments: Treatment[] = [];
displayModal: boolean;
displayModalNotes: boolean;
itemsSymptoms = [];
selectedSymptoms = [];
itemsMedications = [];
selectedMedications = [];
tempPt: string;
show: boolean;
treatmentNotes: string;
// tCols: any;
public isExpanded = false;
public expandedRows = {};
public temDataLength = 0;
// dropdownSymptomsSettings = {};
tempInitPatient: Patient;

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
  this.show = false;
  this.initTreatmentForm();
}

// Initializing Search-Patient Form

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

// Collect form control data from search form
// and display resulted data in results table

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

  // this.tCols = [
  //   { field: 'treatmentDate', header: 'Treated Date', display: 'table-cell' },
  //   { field: 'symptoms', header: 'Symptoms', display: 'table-cell' },
  //   { field: 'medications', header: 'Prescription', display: 'table-cell' },
  //   { field: 'addNotes', header: 'Notes', display: 'table-cell'}
  // ];

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
    // copy patient object to tempInitPatient object to pass on to onRowEditCancel method.
  this.tempInitPatient = { ...patient};
}

  onRowEditSave(patient: Patient) {
  this.dataStorageService.updatePatient(patient)
  .subscribe(() => {
    console.log('Success!');
  });
  }

  onRowEditCancel(patient: Patient, ri: number) {
  patient.pId = this.tempInitPatient.pId;
  patient.firstName = this.tempInitPatient.firstName;
  patient.lastName = this.tempInitPatient.lastName;
  patient.dob = this.tempInitPatient.dob;
  patient.gender = this.tempInitPatient.gender;
  patient.phone =  this.tempInitPatient.phone;
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


public initTreatmentForm() {
  const pId = '';
  const treatmentDate = '';
  const addSymptoms = '';
  const addMedications = '';
  const addNotes = '';

  this.addTreatmentForm = new FormGroup({
    pId: new FormControl(pId),
    treatmentDate: new FormControl(treatmentDate),
    addSymptoms: new FormControl(addSymptoms),
    addMedications: new FormControl(addMedications),
    addNotes: new FormControl(addNotes)
  });

}

getAllTreatments(rowData: Patient) {

    for (const obj in this.expandedRows) {
      if (obj !== rowData.pId) {
      delete this.expandedRows[obj];
      }
  }
    this.getTreatmentsOfPatient(rowData.pId);
    this.tempPt = rowData.pId;
}

getTreatmentsOfPatient(pId: string) {
      this.dataStorageService.fetchTreatmentsOfPatient(pId)
      .subscribe(res => {
        this.treatments = [];
        res.forEach(result => {
          this.treatments.push(new Treatment(result._id,
            result._source.tDate,
            result._source.tSymptoms,
            result._source.tMedPrescription,
            result._source.tNotes));
        });
        this.treatmentService.getTreatments();
      });
      this.itemsSymptoms = this.treatmentService.dropdownSymptoms;
      this.itemsMedications = this.treatmentService.dropdownMedications;
}

addTreatmentToPatient() {
  console.log(this.tempPt);
  const pid = this.tempPt;
  const treatmentDate = this.addTreatmentForm.controls.treatmentDate.value ? this.addTreatmentForm.controls.treatmentDate.value : '*';
  const addSymptoms = this.addTreatmentForm.controls.addSymptoms.value ? this.addTreatmentForm.controls.addSymptoms.value : '*';
  const addMedications = this.addTreatmentForm.controls.addMedications.value ? this.addTreatmentForm.controls.addMedications.value : '*';
  const addNotes = this.addTreatmentForm.controls.addNotes.value ? this.addTreatmentForm.controls.addNotes.value : '*';
  let symptoms = '';
  let medications = '';
  if (addSymptoms !== '*') {
    let tempSym = '';
    addSymptoms.forEach(s => {
      tempSym = tempSym + s.name + ' ';
    });
    const tempSymptomsList = tempSym.trim();
    symptoms = tempSymptomsList.split(' ').join(', ');
}
  if (addMedications !== '*') {
    let tempMed = '';
    addMedications.forEach(m => {
      tempMed = tempMed + m.name + ' ';
    });
    const tempMedicationsList = tempMed.trim();
    medications = tempMedicationsList.split(' ').join(', ');
  }

  if (addNotes !== '*') {
    let tempNotes = '';
    tempNotes = addNotes.split();


  }

  this.dataStorageService.addTreatmentToPatient(new Treatment(pid, treatmentDate, symptoms, medications, addNotes))
  .subscribe(res => {
    console.log(res);
    this.spinner.show();
    setTimeout(() => {
      this.getTreatmentsOfPatient(pid);
      this.spinner.hide();
    }, 1000);
});

  this.onClearTreatmentForm();
}

onClearTreatmentForm() {
  this.addTreatmentForm.reset();
}

showModalNotes() {
  this.displayModal = true;
}

showModalNotesDialog(rowData) {
  this.displayModalNotes = true;
  this.treatmentNotes = rowData.tNotes;
  console.log(rowData);
}

onClearNotes() {
  this.addTreatmentForm.controls.addNotes.reset();
}

}
