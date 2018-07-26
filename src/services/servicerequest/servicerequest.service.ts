import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { servicerequest } from './../../models/servicerequest.model'
@Injectable()
export class ServiceRequest {

    private servicerequestRef$ = this.db.list<servicerequest>('servicerequest');
    constructor(private db: AngularFireDatabase){ }

    getServicerequest(){
        return this.servicerequestRef$;
    }

    

    editServiceRequest(servicerequest: servicerequest){
        return this.servicerequestRef$.update(servicerequest.key, servicerequest);
    }

    removeServiceRequest(servicerequest: servicerequest){
        return this.servicerequestRef$.remove(servicerequest.key);
    }

}