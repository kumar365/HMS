import { DoctorAwards } from "./doctor-awards";
import { DoctorEducation } from "./doctor-education";
import { DoctorExperience } from "./doctor-experience";
import { DoctorMemberships } from "./doctor-memberships";
import { DoctorRegistration } from "./doctor-registration";
import { DoctorSlot } from "./doctor-slot";
import { Hospital } from "./hospital";

export class DoctorDetails {
    id!: number;
    name!: string;
    registrationNumber!: string;
    hospital!: Hospital;
    clinicVisitFee!: number;
    teleConsultationFee!: number;
    videoConsultFee!: number;
    service!: string;
    specialization!: string;
    rating!: any;
    doctorEducations!: DoctorEducation[];
    doctorExperiences!: DoctorExperience[];
    doctorAwards!: DoctorAwards[];
    doctorMemberships!: DoctorMemberships[];
    doctorRegistrations!: DoctorRegistration[];
    doctorSlots!: DoctorSlot[];
}
