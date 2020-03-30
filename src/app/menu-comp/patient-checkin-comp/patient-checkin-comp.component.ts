import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Patient } from 'src/app/patients.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-patient-checkin-comp',
  templateUrl: './patient-checkin-comp.component.html',
  styleUrls: ['./patient-checkin-comp.component.css']
})
export class PatientCheckinCompComponent implements OnInit {

  patient: Patient[] = [];

 @ViewChild('pcForm') patientCheckinForm: FormGroup;
 @ViewChild('rdbtn') rbtn: ElementRef;

  constructor(private dataStorageService: DataStorageService) { }



  ngOnInit() {
    this.initForm();
    console.log(this.rbtn);

  }

  private initForm() {
    const firstName = '';
    const lastName = '';
    const dob = '';
    const gender = '';
    const phone = '';

    this.patientCheckinForm = new FormGroup({
      firstName: new FormControl(firstName),
      lastName: new FormControl(lastName),
      dob: new FormControl(dob),
      gender: new FormControl(gender),
      phone: new FormControl(phone)
      // postalCode: new FormControl(postalCode)
    });
  }

  onAddPatient() {


    const firstName = this.patientCheckinForm.controls.firstName.value ? this.patientCheckinForm.controls.firstName.value : '*';
    const lastName = this.patientCheckinForm.controls.lastName.value ? this.patientCheckinForm.controls.lastName.value : '*';
    const dob = this.patientCheckinForm.controls.dob.value ? this.patientCheckinForm.controls.dob.value : '*';
    const gender = this.patientCheckinForm.controls.gender.value ? this.patientCheckinForm.controls.gender.value : '*';
    const phone = this.patientCheckinForm.controls.phone.value ? this.patientCheckinForm.controls.phone.value : '*';


    this.dataStorageService.addPatient(new Patient(firstName, lastName, dob, gender, phone));

    this.onClear();

  }

  onClear() {
    this.patient = [];
    this.patientCheckinForm.controls.firstName.setValue('');
    this.patientCheckinForm.controls.lastName.setValue('');
    this.patientCheckinForm.controls.dob.setValue('');
    this.patientCheckinForm.controls.gender.setValue('');
    this.patientCheckinForm.controls.phone.setValue('');
    }


}
