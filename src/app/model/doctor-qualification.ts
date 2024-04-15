import { Qualification } from "./qualification";
import { User } from "./user";

export class DoctorQualification {
    id!: any;
    doctorUser!: User;
    qualification!: Qualification;
    university!: string;
    fromYear!: string;
    toYear!: string;
    address!: string;
    country!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
