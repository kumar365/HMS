import { City } from "./city";
import { Country } from "./country";
import { State } from "./state";

export class User {
    id!: number;
    username!: string;
    userType!: string;
    password!: string;
    phoneNumber!: string;
    email!: string;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    gender!: string;
    dateOfBirthString!: string;
    dateOfBirth!: any;
    age!: string;
    biography!: string;
    bloodGroup!: string;
    address!: string;
    city!: City;
    state!: State;
    country!: Country;
    profileImageName!: string;
    pinCode!: string;
    version!: string;
    ipAddress!: string;
    modifiedBy!: string;
    modifiedDate!: string;
    lostLogin!: string;
    createdBy!: string;
    creationDate!: string;
    enabled!:boolean;
    providerUserId!: string;
    displayName!: string;
    provider!: string;
    token!: string;
    oldPassword!: string;
    newPassword!: string;
    
}
