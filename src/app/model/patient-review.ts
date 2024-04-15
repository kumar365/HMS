import { User } from "./user";

export class PatientReview {
    id!: any;
    patientUser!: User;
    doctorUser!: User;
    isReviewAnonymous!: string;
    waitTimeRating!: any;
    overallRating!: any;
    review!: string;
    isDoctorRecommended!: string;
    reviewDate!: any;
    version!: string;
    ipAddress!: string;
    createdBy!: string;
    createdDate!: any;
}

