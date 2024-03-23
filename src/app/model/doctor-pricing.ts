import { User } from "./user";

export class DoctorPricing {
    id!: any;
    doctorUser!: User;
    consultationType!: string;
    price!: number;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
