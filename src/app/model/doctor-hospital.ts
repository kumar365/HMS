import { Hospital } from "./hospital";
import { User } from "./user";

export class DoctorHospital {
    id!: any;
    doctorUser!: User;
    hospital!: Hospital;
    timeSlotPerClientMints!: any;
    firstConsultationFee!: any;
    followupConsultationFee!: any;
    streetAddress!: string;
    city!: string;
    state!: string;
    country!: string;
    pinCode!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
