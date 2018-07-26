import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { patient } from '../../models/patient'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { PatientPage } from '../patient/patient';
import firebase, { database } from "firebase";

@IonicPage()
@Component({
  selector: 'page-addpatient',
  templateUrl: 'addpatient.html',
})
export class AddpatientPage {

  userid : string;
  patient = {} as patient

  patientRef$: AngularFireList<any>;


  constructor(private alertCtrl:AlertController, private afDatabase:AngularFireDatabase, private db: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    var user = db.auth.currentUser;
    this.userid= user.uid
    this.patientRef$ = this.afDatabase.list('patient');

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Patient info successfully added!',
      buttons: ['OK!']
    });
    alert.present();
  }




  addpatient(patient:patient){

    this.patientRef$.push(  {
      userid: this.userid,
      name: this.patient.name,
      dob: this.patient.dob,
      nric: this.patient.nric,
      medicalhistory: this.patient.medicalhistory,
      annualincome: this.patient.annualincome,
      address: this.patient.address,
      relationship : this.patient.relationship,
      postalcode: this.patient.postalcode,
      phone: this.patient.phone,
      gender: this.patient.gender,
       
    });

    var nric = patient.nric
    firebase.database().ref('/patient/').once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if(nric == snap.val().nric)
        {
          firebase.database().ref(`/patient/${snap.key}`).update({"patientid":snap.key})
          
        }
        
        return false; 
      });
    });


    this.patient = {} as patient
    this.navCtrl.setRoot(PatientPage)
  }

}
