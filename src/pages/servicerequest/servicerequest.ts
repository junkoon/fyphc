import { Component, NgZone, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController, Events } from 'ionic-angular';
import { AddservicerequestPage } from '../addservicerequest/addservicerequest'
import { servicerequest } from '../../models/servicerequest.model'
import { EditservicerequestPage } from '../editservicerequest/editservicerequest'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase   } from 'angularfire2/database'
import firebase, { database } from "firebase";
import { AuthService } from '../../app/auth.service'
import * as _ from 'lodash'
import { SpviewservicerequestPage } from '../spviewservicerequest/spviewservicerequest';

@IonicPage()
@Component({
  selector: 'page-servicerequest',
  templateUrl: 'servicerequest.html',
})
export class ServicerequestPage {

  servicerequest$ = [];
  userid : string;
  userRoles: Array<string>;

  constructor(public renderer: Renderer, public events: Events, private zone: NgZone, private afDatabase : AngularFireDatabase, auth:AuthService,private db: AngularFireAuth, private actionSheetCtrl: ActionSheetController,  public navCtrl: NavController, public navParams: NavParams, public menu : MenuController) {
    
    this.menu.enable(true, 'myMenu');
    
    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        console.log('force update the screen');
      });
    });
    this.events.publish('updateScreen');

    
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    }).subscribe()

    var user = db.auth.currentUser;
    this.userid= user.uid
    
    if(!this.canRead())
    {
      firebase.database().ref('/servicerequest/').once('value', (snapshot) => {
        snapshot.forEach(snap => {
          if(snap.val().status == "New")
          {
            this.servicerequest$.push(snap.val());
            
          }
          
          return false;   
        });
      });
    }
    else
    {
      firebase.database().ref('/servicerequest/').once('value', (snapshot) => {
        snapshot.forEach(snap => {
          if(this.userid == snap.val().userid && snap.val().status == "New")
          {
            this.servicerequest$.push(snap.val());
          }
          return false;   
        });
      });
    }


  }

  doRefresh(refresher){
    this.navCtrl.setRoot(ServicerequestPage);
  };

 

  selectServiceRequest(servicerequest: servicerequest){

    if(!this.canRead())
    {
      this.navCtrl.push(SpviewservicerequestPage, {servicerequest: servicerequest}); 
    }
    else
    {
      this.actionSheetCtrl.create({
        title: `${servicerequest.description}`,
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.navCtrl.push(EditservicerequestPage, {servicerequest: servicerequest}); 
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {

              firebase.database().ref('/servicerequest/').once('value', (snapshot) => {
                snapshot.forEach(snap => {
  
                  if(servicerequest.servicerequestid == snap.val().servicerequestid)
                  {
                    this.afDatabase.list<servicerequest>('servicerequest').remove(snap.key)
                  }
                  return false;   
                });
              });
            
            }
          },
          {
            text: 'Cancel',
            role: 'Cancel',
            handler: () => {
              //delete
            }
          }
        ]
      }).present();
    }

  }



  addservicerequest(){
    this.navCtrl.push(AddservicerequestPage);
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
