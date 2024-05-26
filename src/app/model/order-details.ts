import { Payment } from "./payment";

export class OrderDetails {
    id!: number;
    userId!: number;
    total!: number;
    payment!: Payment;
    ipAddress!: string;
    modifiedDate!: any;
    createdDate!: any;
}
