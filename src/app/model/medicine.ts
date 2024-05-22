import { ProductDetails } from "./product-details";

export class Medicine {
    id!: any;
    name!: string;
    medicineType!: string;
    medicineCategory!: string;
    medicineRegNumber!: string;
    medicinePrice!: number;
    expiryDate!: any;
    expiryDateString!: string;
    units!: number;
    quantityPerUnit!: number;
    pricePerUnit!: number;
    totalQuantity!: number;
    isPrescriptionRequired!: string;
    medicineImage!: File;
    medicineImageName!: string;
    files!: File[];
    imageData!: any;
    vendor!: string;
    usedFor!: string[];
    productDetails!: ProductDetails;
    version!: string;
    ipAddress!: string;
    modifiedBy!: string;
    modified_date!: any;
    createdBy!: string;
    createdDate!: any;
    discountPercentage!: any;
    retrievedImage: any;
    quantity1!: number;
}

