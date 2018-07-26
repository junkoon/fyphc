import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase, { database } from "firebase";
import { AngularFireDatabase } from 'angularfire2/database'
import { quotation } from '../../models/quotation';
import { AddquotationPage } from '../addquotation/addquotation';
import { DeclinequotationpagePage } from '../declinequotationpage/declinequotationpage';

@IonicPage()
@Component({
  selector: 'page-resentquotation',
  templateUrl: 'resentquotation.html',
})
export class ResentquotationPage {
  quotation : quotation;
  servicerequest = {};
  sp = {};

  constructor(private afDatabase : AngularFireDatabase,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.quotation = this.navParams.get('quotation')

    firebase.database().ref(`/serviceprovider/${this.quotation.serviceproviderid}`).on('value', personSnapshot => {
      this.sp = personSnapshot.val();
    });

    firebase.database().ref(`/servicerequest/${this.quotation.servicerequestid}`).on('value', personSnapshot => {
      this.servicerequest = personSnapshot.val();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResentquotationPage');
  }

  resent(){
    this.navCtrl.push(AddquotationPage, {servicerequest: this.servicerequest});
  }

  presentConfirm(quotation: quotation) {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.afDatabase.list<quotation>('quotation').remove(this.quotation.quotationid)
            this.navCtrl.setRoot(DeclinequotationpagePage)
          }
        }
      ]
    });
    alert.present();
  }

}
