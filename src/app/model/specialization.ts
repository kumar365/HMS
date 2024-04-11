import { DoctorHospital } from "./doctor-hospital";
import { DoctorSpecialization } from "./doctor-specialization";

export class Specialization {
    id!: number;
    name!: string;
    registrationNumber!: string;
    address!: string;
    country!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
    doctorSpecializations !: DoctorSpecialization[];
}
