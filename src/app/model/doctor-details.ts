import { Education } from "./education";
import { Experience } from "./experience";
import { Hospital } from "./hospital";
import { Qualification } from "./qualification";
import { User } from "./user";

export class DoctorDetails {
    id!: number;
    doctorUser!: User;
    qualification!: Qualification[];
    education!: Education;
    hospital!: Hospital;
    experience!: Experience[];
    clinicVisitFee!: number;
    teleConsultationFee!: number;
    videoConsultFee!: number;
    service!: string;
    specialization!: string;
}
