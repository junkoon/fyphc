import { DateTime } from "ionic-angular";

export interface servicerequest {
    servicerequestid?: string;
    patientid?: string;
    key? : string;
    description: string;
    requestdate?: Date;
    appointmentdatetime: DateTime;
    status: string;
    userid?: string;

}
