export interface Roles {
    customer?: boolean;
    serviceprovider?: boolean;
}


export class User {
    email: string;
    password: string;
    name: string;
    nric: string;
    phone: number;
    roles: Roles;
    userid: string;
}



export class serviceprovider {
    email: string;
    password: string;
    name: string;
    nric: string;
    phone: number;
    dob: Date;
    address: string;
    gender: string;
    experience_years: number;
    company?: string;
    roles: Roles;
    serviceproviderid: string;
}
