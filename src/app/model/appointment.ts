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
    user!: User;
    appointmentFor!: string;
    patientName!: string;
    consultationType!: string;
    price!: number;
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
    amount!: any;
    dependent!: any;
    followUpDate!: any;
    cardDetails!:CardDetails;
}
