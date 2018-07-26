import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpatientPage } from './addpatient';

@NgModule({
  declarations: [
    AddpatientPage,
  ],
  imports: [
    IonicPageModule.forChild(AddpatientPage),
  ],
})
export class AddpatientPageModule {}
