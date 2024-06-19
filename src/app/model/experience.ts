import { User } from "./user";

export class Experience {
    id!: number;
    doctorUser!: User;
    hospitalName!: string;
    fromYear!: string;
    toYear!: string;
    experienceData!: string;
    designation!: string;
}
