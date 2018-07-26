import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { servicerequest } from '../../models/servicerequest.model';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { quotation } from '../../models/quotation';
import firebase, { database } from "firebase";
import { QuotationPage } from '../quotation/quotation';

@IonicPage()
@Component({
  selector: 'page-addquotation',
  templateUrl: 'addquotation.html',
})
export class AddquotationPage {
  

  serviceproviderid : string;
  servicerequest: servicerequest;
  quotationRef$: AngularFireList<any>;
  quotation = {} as quotation
  serviceprovider = {}

  constructor(private afDatabase:AngularFireDatabase, private db: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.servicerequest = this.navParams.get('servicerequest')
    var user = db.auth.currentUser;
    this.serviceproviderid = user.uid
    this.quotationRef$ = this.afDatabase.list('quotation');

    firebase.database().ref(`/serviceprovider/${this.serviceproviderid}`).on('value', personSnapshot => {
      this.serviceprovider = personSnapshot.val();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddquotationPage');
  }

  addquotation(quotation : quotation){

    this.quotationRef$.push({
      servicerequestid: this.servicerequest.servicerequestid,
      serviceproviderid: this.serviceproviderid,
      quotationdate: new Date().toISOString().substring(0, 10),
      servicescope: this.quotation.servicescope,
      fee: this.quotation.fee,
      providerphone: this.serviceprovider["phone"],
      provideremail: this.serviceprovider["email"],
      status: 'Pending'
    });

    
    firebase.database().ref('/quotation/').once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if(quotation.servicescope == snap.val().servicescope && this.servicerequest.servicerequestid == snap.val().servicerequestid && this.serviceproviderid == snap.val().serviceproviderid)
        {
          firebase.database().ref(`/quotation/${snap.key}`).update({"quotationid":snap.key})
          
        }
        
        return false; 
      });
    });


    this.quotation = {} as quotation
    this.navCtrl.setRoot(QuotationPage);
  }

}
