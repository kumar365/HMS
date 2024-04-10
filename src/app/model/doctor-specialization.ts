import { Specialization } from "./specialization";
import { User } from "./user";

export class DoctorSpecialization {
    id!: any;
    doctorUser!: User;
    specialization!: Specialization;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
