import { CardDetails } from "./card-details";

export class AmbBooking {
    bookAmbulanceFor!: string;
    ambulanceType!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    paymentMethod!: string;
    cardDetails!: CardDetails;
    termsAndConditions!: string;
}
