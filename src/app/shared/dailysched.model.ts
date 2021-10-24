import { Coursesched } from "./coursesched.model";

export class Dailysched {
    time!: string;
    monday!: Coursesched;
    tuesday!: Coursesched;
    wednesday!: Coursesched;
    thursday!: Coursesched;
    friday!: Coursesched;
}
