import { CardDetails } from "./card-details";
import { User } from "./user";

export class Appointment {
    appointmentId!: any;
    appointmentFor!: string;
    patientName!: string;
    doctorName!: string;
    consultationType!: string;
    date!: any;
    prescription!: string;
    confirmed!: string;
    user!: User;
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
    cardDetails!:CardDetails;
}
