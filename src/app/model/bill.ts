import { Invoice } from "./invoice";
import { User } from "./user";

export class Bill {
    billId!: any;
    name!: string;
    orderId!: any;
    invoiceId!: Invoice;
    patientUser!: User;
    title!: string;
    billAmount!: any;
    billType!: string;
    billingDateString!: string;
    billingDate!: any;
    paymentStatus!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
