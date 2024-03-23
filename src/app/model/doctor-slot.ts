import { User } from "./user";

export class DoctorSlot {
    id!: any;
    doctorUser!: User;
    dayWeek!: number;
    slotDuration!: number;
    slotStart!: any;
    slotEnd!: any;
    slotDate!: any;
    status!: string;
    patientUser!: User;
    dayWeekText!: string;
    price!: number;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
    startTime!: any;
    endTime!: any;
}
