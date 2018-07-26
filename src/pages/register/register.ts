import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User

  constructor(private db: AngularFireAuth,private afDatabase:AngularFireDatabase, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  alert(message: string){
    this.alertCtrl.create({
        title: 'Hey!',
        subTitle: message,
        buttons: ['OK']
    }).present();
  }

  async register(user: User){
    try {
      const result = await this.db.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        this.db.authState.subscribe(auth => {
          this.user.userid = auth.uid;
          this.user.email = auth.email;
          this.user.roles = {customer : true}
          this.afDatabase.object(`user/${auth.uid}`).set(this.user)
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
