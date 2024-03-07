import { CardDetails } from "./card-details";

export class Payment {
    paymentId!: any;
    invoiceId!: any;
    userId!: any;
    productId!: any;
    paymentType!: string;
    paymentDate!: any;
    amount!: any;
    version!: string;
    ipAddress!: string;
    modifiedBy!: string;
    modifiedDate!: any;
    createdBy!: string;
    createdDate!: any;
    cardDetails!: CardDetails;
}
