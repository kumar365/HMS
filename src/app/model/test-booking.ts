import { CardDetails } from "./card-details";
import { User } from "./user";

export class TestBooking {
    bookingId!: any;
    bookingFor!: string;
    patientName!: string;
    doctorName!: string;
    bookingDate!: any;
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
