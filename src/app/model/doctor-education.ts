import { Education } from "./education";
import { User } from "./user";

export class DoctorEducation {
    id!: any;
    doctorUser!: User;
    education!: Education;
    fromYear!: string;
    toYear!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
