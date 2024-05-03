import { Discount } from "./discount";
import { Product } from "./product";
import { User } from "./user";

export class Invoice {
    invoiceID!: any;
    patientUser!:User;
    patientName!: string;
    appointmentID!: any;
    invoice!: string;
    product!: Product;
    disount!: Discount;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: string;
}
