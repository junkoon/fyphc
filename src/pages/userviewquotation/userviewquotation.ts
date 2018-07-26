import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { quotation } from '../../models/quotation';
import firebase, { database } from "firebase";
import { AngularFireDatabase } from 'angularfire2/database'
import { QuotationPage } from '../quotation/quotation';
import { servicerequest } from '../../models/servicerequest.model';
import { AuthService } from '../../app/auth.service'
import * as _ from 'lodash'
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
  selector: 'page-userviewquotation',
  templateUrl: 'userviewquotation.html',
})
export class UserviewquotationPage {
  quotation : quotation;
  servicerequest = {};
  sp = {};
  patient = {};
  servicerequestdata : servicerequest;
  userRoles: Array<string>;
  date : string;
  
  event = { title: "", location: "", message: "", startDate: "", endDate: "" };

  constructor(private calendar: Calendar,private nativeGeocoder: NativeGeocoder,auth:AuthService,private alertCtrl: AlertController, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.quotation = this.navParams.get('quotation')
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()


    firebase.database().ref(`/serviceprovider/${this.quotation.serviceproviderid}`).on('value', personSnapshot => {
      this.sp = personSnapshot.val();
    });

    firebase.database().ref(`/servicerequest/${this.quotation.servicerequestid}`).on('value', personSnapshot => {
      this.servicerequest = personSnapshot.val();
      this.servicerequestdata = personSnapshot.val();
      this.date = personSnapshot.val().appointmentdatetime;

      firebase.database().ref(`/patient/${personSnapshot.val().patientid}`).on('value', patientdata => {
        this.patient = patientdata.val();
      });
    });
    

    
    // console.log(this.servicerequestdata)

    // console.log(this.servicerequestdata.patientid)

    // firebase.database().ref(`/patient/${this.servicerequestdata.patientid}`).on('value', personSnapshot => {
    //   this.patient = personSnapshot.val();
    // });

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
  };

  
  

//   this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818, options)
//   .then((result: NativeGeocoderReverseResult[]) => console.log(JSON.stringify(result[0])))
//   .catch((error: any) => console.log(error));

// this.nativeGeocoder.forwardGeocode('530541', options)
//   .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
//   .catch((error: any) => console.log(error));
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserviewquotationPage');
  }

  accept(quotation : quotation){

    quotation.status = "Accepted"
    this.servicerequestdata.status = "Ongoing"
    this.db.list<servicerequest>('servicerequest').update(this.servicerequestdata.servicerequestid, this.servicerequestdata)

    this.db.list<quotation>('quotation').update(quotation.quotationid, quotation).then(() => {
      this.navCtrl.setRoot(QuotationPage)
      this.save();
    })

  }

  save() {
    
    this.calendar.createEvent("Service Request", "", "Ongoing Service Request",  new Date(this.date), new Date(this.date)).then(
      (msg) => {
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Event saved successfully',
          buttons: ['OK']
        });
        alert.present();
      },
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Failed!',
          subTitle: err,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }



  decline(quotation : quotation){
    quotation.status = "Decline"

    this.db.list<quotation>('quotation').update(quotation.quotationid, quotation).then(() => {
      this.navCtrl.setRoot(QuotationPage)
      
    })
  }

  presentPrompt(quotation : quotation) {
    let alert = this.alertCtrl.create({
      title: 'Reason for declining',
      inputs: [
        {
          name: 'reason'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: data => {
            quotation.status = "Decline"
            firebase.database().ref(`/quotation/${quotation.quotationid}`).update({"reasonfordeclining":data.reason})
            this.db.list<quotation>('quotation').update(quotation.quotationid, quotation,).then(() => {
              this.navCtrl.setRoot(QuotationPage)
            })
          }
        }
      ]
    });
    alert.present();
  }

  endrequest(quotation : quotation) {
    const alert = this.alertCtrl.create({
      title: 'Rate Service Provider:',
      cssClass: 'alertstar',
      enableBackdropDismiss:false,
      buttons: [
           { text: '1', handler: data => { this.ratings("1",quotation)}},
           { text: '2', handler: data => { this.ratings("2",quotation)}},
           { text: '3', handler: data => { this.ratings("3",quotation)}},
           { text: '4', handler: data => { this.ratings("4",quotation)}},
           { text: '5', handler: data => { this.ratings("5",quotation)}}
      ]
 });
 alert.present();
  }

  ratings(string, quotation : quotation){

    this.servicerequestdata.status = "Compeleted"
    this.db.list<servicerequest>('servicerequest').update(this.servicerequestdata.servicerequestid, this.servicerequestdata)
    quotation.status = "Completed"
    firebase.database().ref(`/quotation/${quotation.quotationid}`).update({"ratings":string})
    this.db.list<quotation>('quotation').update(quotation.quotationid, quotation,).then(() => {
      this.navCtrl.setRoot(QuotationPage)
    })

  }

  private canRead(): boolean {
    const allowed = ['customer']
    if(this.matchingRole(allowed) && this.quotation.status == "Pending"){
      return true;
    }
    else{
      return false;
    }
  }

  private endreq(): boolean {
    const allowed = ['customer']
    if(this.matchingRole(allowed) && this.quotation.status == "Accepted"){
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
