import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AuthService } from '../../app/auth.service'
import firebase, { database } from "firebase";
import * as _ from 'lodash'
import { quotation } from '../../models/quotation';
import { EditquotationPage } from '../editquotation/editquotation';
import { UserviewquotationPage } from '../userviewquotation/userviewquotation';
import { DeclinequotationpagePage } from '../declinequotationpage/declinequotationpage';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  servicerequestid = [];
  curruserid : string;
  userRoles: Array<string>;
  quotation$ = [];

  constructor(public events: Events, private zone: NgZone, auth:AuthService ,private db: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    auth.user.map(user => {
      
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()

    var user = db.auth.currentUser;
    this.curruserid= user.uid
    if(!this.canRead())
    {
      firebase.database().ref('/quotation/').once('value', (snapshot) => {
        snapshot.forEach(snap => {
          if(this.curruserid == snap.val().serviceproviderid && snap.val().status == "Completed")
          {
            this.quotation$.push(snap.val());
          }
           
          return false;   
        });
      });
    }
    else
    {
      firebase.database().ref('/servicerequest/').once('value', (snapshot) => {
        snapshot.forEach(snap => {
          if(this.curruserid == snap.val().userid)
          {
            firebase.database().ref('/quotation/').once('value', (snapshot) => {
              snapshot.forEach(w => {
                if(snap.val().servicerequestid == w.val().servicerequestid && w.val().status == "Completed")
                {
                  this.quotation$.push(w.val());
                }
                
                return false;  
              });
            });
          }

          return false;   
        });
      });
    }
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
    this.events.publish('updateScreen');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  selectQuotation(quotation : quotation){
    this.navCtrl.push(UserviewquotationPage, {quotation : quotation}); 
  }

  private canRead(): boolean {
    const allowed = ['customer']
    if(this.matchingRole(allowed)){
      return true;
    }
    else{
      return false;
    }
  }


  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }


}
