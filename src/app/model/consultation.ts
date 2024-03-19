import { CardDetails } from "./card-details";

export class Consultation {
    symptoms!: string;
    speciality!: string;
    phoneNumber!: string;
    consultationType!: string;
    patientName!: string;
    couponCode!: string;
    paymentMethod!: string;
    cardDetails!: CardDetails;
    termsAndConditions!: string;
}
