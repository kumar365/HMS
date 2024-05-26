import { OrderDetails } from "./order-details";

export class OrderItems {
    id!: number;
    orderId!: OrderDetails;
    productId!: number;
    ipAddress!: string;
    modifiedDate!: any;
    createdDate!: any;
}
