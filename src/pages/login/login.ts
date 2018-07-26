import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { User } from '../../models/user'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginHomePage } from '../login-home/login-home'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: BehaviorSubject<User> = new BehaviorSubject(null)

  constructor(private db: AngularFireAuth, private afDatabase:AngularFireDatabase,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
    this.menu.enable(false, 'myMenu');
    this.db.authState.switchMap(auth => {
      if(auth){
        return this.afDatabase.object('user/' + auth.uid).valueChanges();
      }
      else
      {
        return Observable.of(null)
      }
    })
    .subscribe(user => {
      this.user.next(user)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  alert(message: string){
    this.alertCtrl.create({
        title: 'Hey!',
        subTitle: message,
        buttons: ['OK']
    }).present();
  }

  async login(user: User)
  {
    try{
      const result = await this.db.auth.signInWithEmailAndPassword(user.email,user.password);
      if(result){
        this.navCtrl.setRoot(LoginHomePage);
      }
    }
    catch(e)
    {
      console.error(e);
      this.alert(e.message);
    }

  }

}
