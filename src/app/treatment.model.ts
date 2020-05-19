export class Treatment {
    public pid: string;
    public tDate: string;
    public tSymptoms: string;
    public tMedPrescription: string;
    public tNotes: string;

    constructor(pid: string, treatmentDate: string, symptoms: string, medPrescription: string, notes: string ) {
        this.pid = pid;
        this.tDate = treatmentDate;
        this.tSymptoms = symptoms;
        this.tMedPrescription = medPrescription;
        this.tNotes = notes;
    }

}
