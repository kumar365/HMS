import { User } from "./user";

export class Dependent {
    id!: any;
    name!: string;
    relationship!: string;
    phoneNumber!: string;
    gender!: string;
    dateOfBirthString!: string;
    dateOfBirth!: any;
    bloodGroup!: string;
    version!: string;
    ipAddress!: string;
    modifiedBy!: string;
    modifiedDate!: string;
    createdBy!: string;
    creationDate!: string;
    active!: boolean;
    user!: User;
    profileImage!: any;
}
