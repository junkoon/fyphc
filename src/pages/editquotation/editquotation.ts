import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { quotation } from '../../models/quotation';

import firebase, { database } from "firebase";
import { AngularFireDatabase } from 'angularfire2/database'
import { QuotationPage } from '../quotation/quotation';

@IonicPage()
@Component({
  selector: 'page-editquotation',
  templateUrl: 'editquotation.html',
})
export class EditquotationPage {

  quotation:quotation;
  servicerequest = {};

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.quotation = this.navParams.get('quotation')

    firebase.database().ref(`/servicerequest/${this.quotation.servicerequestid}`).on('value', personSnapshot => {
      this.servicerequest = personSnapshot.val();
    });
  }

  ionViewWillLoad() {

    console.log('ionViewDidLoad EditquotationPage');
  }

  editquotation(quotation : quotation){
    this.db.list<quotation>('quotation').update(quotation.quotationid, quotation).then(() => {
      this.navCtrl.setRoot(QuotationPage)
      
    })
  }

  delquotation(quotation : quotation){
    this.db.list<quotation>('quotation').remove(quotation.quotationid).then(() => {
      this.navCtrl.setRoot(QuotationPage)
    })

  }

}
