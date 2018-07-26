import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginHomePage } from '../pages/login-home/login-home'
import { PatientPage } from '../pages/patient/patient';
import { ServicerequestPage } from '../pages/servicerequest/servicerequest'
import { ListPage } from '../pages/list/list';

import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { AuthService } from './auth.service'
import * as _ from 'lodash'
import { QuotationPage } from '../pages/quotation/quotation';
import { DeclinequotationpagePage } from '../pages/declinequotationpage/declinequotationpage';
import { OngoingservicerequestPage } from '../pages/ongoingservicerequest/ongoingservicerequest';
import { HistoryPage } from '../pages/history/history';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  userRoles: Array<string>;



  constructor(private alertCtrl: AlertController, private afDatabase:AngularFireDatabase, auth:AuthService,private db: AngularFireAuth, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  home(){
    this.nav.setRoot(LoginHomePage);
  }

  patient(){
    this.nav.setRoot(PatientPage);
  }

  quotation()
  {
    this.nav.setRoot(QuotationPage);
  }

  declinequotation()
  {
    this.nav.setRoot(DeclinequotationpagePage)
  }

  servicerequest()
  {
    this.nav.setRoot(ServicerequestPage);
  }

  ongoingservicerequest()
  {
    this.nav.setRoot(OngoingservicerequestPage)
  }

  history(){
    this.nav.setRoot(HistoryPage)
  }



  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thank you!',
      subTitle: 'You have successfully signout',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  
  logout(){
    this.db.auth.signOut()
    this.presentAlert();
    this.nav.setRoot(HomePage);
    
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
