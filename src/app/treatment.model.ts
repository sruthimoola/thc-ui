export class Treatment {
    public tDate: string;
    public tSymptoms: string;
    public tMedPrescription: string;
    public tNotes: string;

    constructor(treatmentDate: string, symptoms: string, medPrescription: string, notes: string ) {
        this.tDate = treatmentDate;
        this.tSymptoms = symptoms;
        this.tMedPrescription = medPrescription;
        this.tNotes = notes;
    }

}
