export class ElectionAdmin_model {
    a_id!: number;
    a_username!: string;
    a_password!: string;
    a_confirmpassword!: string;
    a_typeadmin!: number;
    a_typesuperadmin!: number;
    a_name!: string;
    a_contactno!: string;
    a_message!: string;
    a_image!: File;


}

export class Business {
    businessid!: number;
    businessname!: string;
    address!: string;
    pincode!: number;
    contactno!: number;
    email!: string;
    geolocation!: string;
    marginlength!: number;
    marginwidth!: number;
    burstingfactor!: number;
    gsm!: number;
    rate!: number;
    flutefactor!: number;
    waste!: number;
    conversionrate!: number;
    profit!: number;
    tax!: number;
    estimatenote!: string;
    activationdate!: string;
    subscriptiondate!: string;
    multiuser!: number;
    status!: string;
}

export class TransactionDetails {
    transactionid!: number;
    businessid!: number;
    transactiondate!: string;
    duration!: number;
    amount!: number;
    perticulars!: string;
    status!: string;
}

export class Subscription {
    subscriptionid!: number;
    subscription!: string;
    duration!: number;
    amount!: number;
    status!: string;
}

export class appConfig {
    configid!: number;
    configname!: string;
    configvalue!: string;
}

export class changePassword {
    adminid!: number;
    adminname!: string;
    mobileno!: string;
    adminpassword!: string;
    firebaseid!: string;
    fcmtoken!: string;
    deviceinfo!: string;
    status!: string;
    oldPassword!: string;
    confirmPassword!: string;
}

export class myimages {
    base64_code!: string;
}