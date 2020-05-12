import { Treatment } from './treatment.model';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class TreatmentService {
    // dropdownItems = [];
    // selectedItems = [];
    // dropdownSettings: IDropdownSettings = {};

    // private treatments: Treatment[] = [
    //     new Treatment('1', '12/27/2019', 'Headache, Low body temperature', 'Arsenic-Alb 200', ''),
    //     new Treatment('1', '01/25/2020', 'Body pains, Restlessness', 'Arnica 200', ''),
    //     new Treatment('1', '02/12/2020', 'Nausea, Headache', 'Nuxvom 30', ''),
    //     new Treatment('1', '02/02/2020', 'High Temperature, Nausea, Body Pains', 'Mg-Phos 60', ''),
    //     new Treatment('1', '03/10/2020', 'Sinus, Headache', 'Arsenic Alb 200', ''),
    //     new Treatment('1', '03/10/2020', 'Stomach ache, Nausea', 'Merc-Sol 60', '')
    // ];

    private treatments: Treatment[] = [];

    public dropdownSymptoms = [
      { id: 1, name: 'Headache' },
      { id: 2, name: 'Body-Pains' },
      { id: 3, name: 'Stomach-ache' },
      { id: 4, name: 'Nausea' },
      { id: 5, name: 'Sinus' },
      { id: 6, name: 'Low-Temperature'},
      { id: 7, name: 'High-Temperature'}
    ];

    // public dropdownSymptoms = ['Headache', 'Body Pains'];

    public selectedSymptoms = [
        // { id: 2, name: 'Body Pains' },
        // { id: 7, name: 'High Temperature' }
      ];

    public dropdownMedications = [
      { id: 1, name: 'Arsenic-Alb-30' },
      { id: 2, name: 'Arnica-60' },
      { id: 3, name: 'Arsenic-Alb-200' },
      { id: 4, name: 'Merc-Sol-30' },
      { id: 5, name: 'Mg-Phos-60' },
      { id: 6, name: 'Nuxvom-200'}
    ];
    public selectedMedications = [
      // { id: 1, name: 'Arsenic-Alb 30' }
    ];

    getTreatments() {
        return this.treatments.slice();
    }




}
