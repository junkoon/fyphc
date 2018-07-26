import { DateTime } from "ionic-angular";

export interface quotation {

    quotationid?: string;
    servicerequestid: string;
    quotationdate: DateTime;
    servicescope: string;
    fee: Float32Array;
    providerphone : string;
    provideremail: string;
    status: string;
    serviceproviderid: string;
    reasonfordeclining?: string;
    
}