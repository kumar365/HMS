import { Discount } from "./discount";
import { Product } from "./product";
import { User } from "./user";

export class Invoice {
    invoiceID!: any;
    patientUser!:User;
    doctorUser!:User;
    patientName!: string;
    appointmentID!: any;
    invoice!: string;
    amount!: number;
    product!: Product;
    disount!: Discount;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: string;
    retrievedImage!: any;
}
