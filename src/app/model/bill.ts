import { Invoice } from "./invoice";
import { User } from "./user";

export class Bill {
    billId!: any;
    name!: string;
    orderId!: any;
    invoiceId!: Invoice;
    user!: User;
    title!: string;
    amount!: any;
    type!: string;
    billingDateString!: string;
    billingDate!: any;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
