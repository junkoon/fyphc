import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform  } from 'ionic-angular';
import { servicerequest } from '../../models/servicerequest.model';
import { patient } from '../../models/patient';

import firebase, { database } from "firebase";
import { AddquotationPage } from '../addquotation/addquotation';
import { serviceprovider } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-spviewservicerequest',
  templateUrl: 'spviewservicerequest.html',
})
export class SpviewservicerequestPage {

  servicerequest: servicerequest;
  patient = {}
  user = {}
  public devWidth = this.platform.width()

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
   
    this.servicerequest = this.navParams.get('servicerequest')

    firebase.database().ref(`/patient/${this.servicerequest.patientid}`).on('value', personSnapshot => {
      this.patient = personSnapshot.val();
    });

    firebase.database().ref(`/user/${this.servicerequest.userid}`).on('value', personSnapshot => {
      this.user = personSnapshot.val();
    });
    
  
  }
  createquote(servicerequest: servicerequest){
    this.navCtrl.push(AddquotationPage, {servicerequest: servicerequest});
  }

  ionViewWillLoad() {


  }

}
