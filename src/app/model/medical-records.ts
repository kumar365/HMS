import { User } from "./user";

export class MedicalRecords {
    id!: any;
    mrId!: string;
    name!: string;
    hospitalName!: string;
    patientType!: string;
    symptoms!: string;
    recordDate!: any;
    recordDateString!: string;
    description!: string;
    attachmentFile!: any;
    attachment!: string;
    orderdBy!: any;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: string;
    user!:User;
}
