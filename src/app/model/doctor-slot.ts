import { DoctorDetails } from "./doctor-details";
import { Slot } from "./slot";
import { User } from "./user";

export class DoctorSlot {
    id!: any;
    doctorDetails!: DoctorDetails;
    dayWeek!: number;
    slotDuration!: number;
    slotStart!: any;
    slotEnd!: any;
    slotDate!: Date;
    dayName!: string;
    slots!: Slot[];
    status!: string;
    dayWeekText!: string;
    isBooked!:boolean;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}
