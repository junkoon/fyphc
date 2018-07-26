import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'
import { SpregisterPage } from '../spregister/spregister'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu : MenuController) {
    this.menu.enable(false, 'myMenu');
  }

  signIn() {
  	this.navCtrl.push(LoginPage);
  }

  registerCustomer() {
  	this.navCtrl.push(RegisterPage);
  }

  registerSP() {
  	this.navCtrl.push(SpregisterPage);
  }

}
