import { User } from "./user";

export class Invoice {
    invoiceID!: any;
    patientUser!:User;
    patientName!: string;
    appointmentID!: any;
    invoice!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: string;
}
