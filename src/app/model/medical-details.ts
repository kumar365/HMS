import { User } from "./user";

export class MedicalDetails {
    id!: any;
    name!: string;
    bmi!: string;
    heartRate!: string;
    fbcStatus!: string;
    weight!: string;
    orderDateString!: string;
    orderDate!: any;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: string;
    user!:User;
}
