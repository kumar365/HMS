import { Discount } from "./discount";
import { Medicine } from "./medicine";
import { User } from "./user";

export class Invoice {
    invoiceID!: any;
    patientUser!:User;
    doctorUser!:User;
    patientName!: string;
    appointmentID!: any;
    invoice!: string;
    amount!: number;
    medicine!: Medicine;
    disount!: Discount;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: string;
    retrievedImage!: any;
}
