import { CardDetails } from "./card-details";

export class Payment {
    paymentId!: any;
    paymentAmount!: any;
    invoiceId!: any;
    userId!: any;
    productId!: any;
    paymentType!: string;
    paymentDate!: any;
    paymentMethod!: string;
    paymentStatus!: string;
    version!: string;
    ipAddress!: string;
    modifiedBy!: string;
    modifiedDate!: any;
    createdBy!: string;
    createdDate!: any;
    cardDetails!: CardDetails;
    termsAndConditions!: string;
}
