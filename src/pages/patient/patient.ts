import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController, Events } from 'ionic-angular'
import { AddpatientPage } from '../addpatient/addpatient'
import { AngularFireDatabase } from 'angularfire2/database'
import { patient } from '../../models/patient'
import { Observable } from 'rxjs/Observable';
import { PatientService } from '../../services/patient/patient.service'

import { AngularFireAuth } from 'angularfire2/auth'


import { AuthService } from '../../app/auth.service'
import firebase, { database } from "firebase";
import { EditpatientPage } from '../editpatient/editpatient';


@IonicPage()
@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})
export class PatientPage {

  patientref$ = [];
  patient$: Observable <patient[]>;
  curruserid : string;
  userId: Array<string>;
  patientid = [];
  


  constructor(public events: Events, private zone: NgZone, private actionSheetCtrl: ActionSheetController, private afAuth: AngularFireAuth, auth:AuthService, private afDatabase : AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public menu : MenuController) {
    this.menu.enable(true, 'myMenu');

    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
    this.events.publish('updateScreen');

    this.afAuth.authState.subscribe(user => {
      if(user) this.curruserid = user.uid
    })

   firebase.database().ref('/patient/').once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if(this.curruserid == snap.val().userid)
        {
           this.patientid.push(snap.key);
           this.patientref$.push(snap.val()); 
        
        }
        
        return false;   
      });
    });
    

    
  }
  

  ionViewDidLoad() {
    console.log(this.patientref$)

  }


  selectPatientRecord(patient: patient){

    this.actionSheetCtrl.create({
      title: `${patient.name}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditpatientPage, {patient: patient}); 
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            
            firebase.database().ref('/patient/').once('value', (snapshot) => {
              snapshot.forEach(snap => {

                if(patient.nric == snap.val().nric)
                {
                  this.afDatabase.list<patient>('patient').remove(snap.key)
                }
                return false;   
              });
            });
            
            
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {

          }
        }
      ]
    }).present();
  }

  addpatient()
  {
    this.navCtrl.push(AddpatientPage);
  }


}
