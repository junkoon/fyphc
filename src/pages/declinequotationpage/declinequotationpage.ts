import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { quotation } from '../../models/quotation';
import firebase, { database } from "firebase";
import { AngularFireAuth } from 'angularfire2/auth'
import { ResentquotationPage } from '../resentquotation/resentquotation';

@IonicPage()
@Component({
  selector: 'page-declinequotationpage',
  templateUrl: 'declinequotationpage.html',
})
export class DeclinequotationpagePage {
  curruserid : string;
  quotation$ = [];

  constructor(public events: Events,private zone: NgZone, private db: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
    this.events.publish('updateScreen');

    var user = db.auth.currentUser;
    this.curruserid= user.uid

    firebase.database().ref('/quotation/').once('value', (snapshot) => {
      snapshot.forEach(snap => {
        if(this.curruserid == snap.val().serviceproviderid && snap.val().status == "Decline")
        {
          this.quotation$.push(snap.val());
        }
        return false;   
      });
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclinequotationpagePage');
  }

  selectQuotation(quotation : quotation){
    this.navCtrl.push(ResentquotationPage, {quotation : quotation});
  }

}
