import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicerequest } from '../../models/servicerequest.model';
import { ServiceRequest } from '../../services/servicerequest/servicerequest.service'
import { AngularFireDatabase } from 'angularfire2/database'
import firebase, { database } from "firebase";

import { ServicerequestPage } from '../servicerequest/servicerequest';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-editservicerequest',
  templateUrl: 'editservicerequest.html',
})
export class EditservicerequestPage {

  servicerequest: servicerequest;
  patient$ = [];
  userid : string;
  servicerequestid : string;

  constructor(private database: AngularFireDatabase,private db: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

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


  }

  ionViewWillLoad() {
    this.servicerequest = this.navParams.get('servicerequest')

  }

  editservicerequest(servicerequest: servicerequest){
    this.database.list<servicerequest>('servicerequest').update(this.servicerequest.servicerequestid, servicerequest).then(() => {
      this.navCtrl.setRoot(ServicerequestPage)
    })
  }

}
