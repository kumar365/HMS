import { DoctorHospital } from "./doctor-hospital";

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
    doctorHospitals !: DoctorHospital[];
}
