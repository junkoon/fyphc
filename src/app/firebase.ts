import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {  FirebaseListObservable  } from "angularfire2/database-deprecated";﻿
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase) { }
 
  getPatient() {
    return this.afd.list('/patient/');
  }
 
  addItem(name) {
    this.afd.list('/shoppingItems/').push(name);
  }
 
  removeItem(id) {
    this.afd.list('/shoppingItems/').remove(id);
  }
}