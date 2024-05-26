import { Medicine } from "./medicine";
import { ShoppingSession } from "./shopping-session";

export class CartItems {
    id!: number;
    shoppingSession!: ShoppingSession;
    medicine!: Medicine;
    quantity!: number;
    ipAddress!: string;
    modifiedDate!: any;
    createdDate!: any;
}
