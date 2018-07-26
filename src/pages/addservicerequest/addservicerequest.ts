import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicerequest} from '../../models/servicerequest.model'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { ServicerequestPage } from '../servicerequest/servicerequest';
import { AngularFireAuth } from 'angularfire2/auth'
import firebase, { database } from "firebase";


@IonicPage()
@Component({
  selector: 'page-addservicerequest',
  templateUrl: 'addservicerequest.html',
})
export class AddservicerequestPage {

  ServiceRequest = {} as servicerequest
  SRRef$: AngularFireList<any>;
  patient$ = [];
  userid : string;

  constructor(private db: AngularFireAuth, private afDatabase:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    var user = db.auth.currentUser;
    this.userid= user.uid

    firebase.database().ref('/patient/').once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if(this.userid == snap.val().userid)
        {
          this.patient$.push(snap.val());
          
        }

        return false;  
      });
    });

    this.SRRef$ = this.afDatabase.list('servicerequest');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddservicerequestPage');
  }

  addservicerequest(servicerequest:servicerequest){
    
    this.SRRef$.push({
      userid: this.userid,
      patientid: this.ServiceRequest.patientid,
      description: this.ServiceRequest.description, 
      requestdate: new Date().toISOString().substring(0, 10),
      appointmentdatetime: this.ServiceRequest.appointmentdatetime ,      
      status: 'New',
      
    });
    
    var desc = servicerequest.description
    var appttime = servicerequest.appointmentdatetime
    firebase.database().ref('/servicerequest/').once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if(desc == snap.val().description && appttime == snap.val().appointmentdatetime)
        {
          firebase.database().ref(`/servicerequest/${snap.key}`).update({"servicerequestid":snap.key})
          
        }
        
        return false; 
      });
    });
    
    this.ServiceRequest = {} as servicerequest
    this.navCtrl.setRoot(ServicerequestPage)
    
  }

}
