import { Injectable } from "@angular/core";
import { AngularFireDatabase} from "angularfire2/database";
import { patient } from './../../models/patient'
import { AngularFireAuth } from 'angularfire2/auth'
@Injectable()
export class PatientService {

    userid : string;



    private patientRef$ = this.db.list<patient>('patient');
   
    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth){
        this.afAuth.authState.subscribe(user => {
            if(user) this.userid = user.uid
          })
     }

    getPatient(){
        return this.patientRef$
    }

    addPatient(patient: patient){

    }

    editPatient(patient: patient){
        return this.patientRef$.update(patient.key, patient);
    }

    removePatient(patient: patient){
        return this.patientRef$.remove(patient.key);
    }
}