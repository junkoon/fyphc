import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { patient } from '../../models/patient';
import { PatientService } from '../../services/patient/patient.service'
import { PatientPage } from '../patient/patient';
import { AngularFireDatabase } from 'angularfire2/database'
import firebase, { database } from "firebase";

@IonicPage()
@Component({
  selector: 'page-editpatient',
  templateUrl: 'editpatient.html',
})
export class EditpatientPage {

  patient : patient;


  constructor(private db: AngularFireDatabase,private alertCtrl: AlertController, private patientservice: PatientService, public navCtrl: NavController, public navParams: NavParams) {

    
  }

  ionViewWillLoad() {
    this.patient = this.navParams.get('patient');
    
  }

  


  editpatient(patient: patient){
    this.db.list<patient>('patient').update(patient.patientid, patient).then(() => {
      this.navCtrl.setRoot(PatientPage)
      
    })
  }

  delpatient(patient: patient){
    this.db.list<patient>('patient').remove(patient.patientid).then(() => {
      this.navCtrl.setRoot(PatientPage)
    })

  }

}
