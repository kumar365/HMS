import { DoctorHospital } from "./doctor-hospital";

export class DoctorHospitalAvailability {
    id!: any;
    doctorHospital!: DoctorHospital;
    dayOfWeek!: string;
    startTime!: any;
    endTime!: any;
    isAvailable!: string;
    reasonOfUnavailability!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
