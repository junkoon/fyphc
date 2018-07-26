import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { serviceprovider } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-spregister',
  templateUrl: 'spregister.html',
})
export class SpregisterPage {

  serviceprovider = {} as serviceprovider

  constructor(private db: AngularFireAuth,private afDatabase:AngularFireDatabase, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpregisterPage');
  }

  alert(message: string){
    this.alertCtrl.create({
        title: 'Hey!',
        subTitle: message,
        buttons: ['OK']
    }).present();
  }

  async register(serviceprovider: serviceprovider){
    try {
      const result = await this.db.auth.createUserWithEmailAndPassword(serviceprovider.email,serviceprovider.password);
      if(result){
        this.db.authState.subscribe(auth => {
          this.serviceprovider.serviceproviderid = auth.uid;
          this.serviceprovider.email = auth.email;
          this.serviceprovider.roles = {serviceprovider : true}
          this.afDatabase.object(`serviceprovider/${auth.uid}`).set(this.serviceprovider)
          .then(()=> this.navCtrl.push(HomePage))
          this.alert("You've successfully registered!")
        })
      }
    }
    catch(e){
      console.error(e);
      this.alert(e.message);
    }
  }

}
