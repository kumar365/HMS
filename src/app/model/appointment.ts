import { CardDetails } from "./card-details";
import { User } from "./user";

export class Appointment {
    id!: any;
    doctorUser!: User;
    doctorName!: string;
    appointmentDate!: any;
    startTime!: any;
    endTime!: any;
    status!: string;
    appBookingChannel!: string;
    patientUser!: User;
    patientName!: string;
    appointmentFor!: string;
    consultationType!: string;
    amountPaid!: number;
    prescription!: string;
    paymentMethod!: string;
    termsAndConditions!: string;
    insurance!: string;
    reason!: string;
    symtoms!: string;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
    dependent!: any;
    followUpDate!: any;
    cardDetails!:CardDetails;
}
