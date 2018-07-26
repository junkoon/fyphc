import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginHomePage } from './login-home';

@NgModule({
  declarations: [
    LoginHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginHomePage),
  ],
})
export class LoginHomePageModule {}
