import { Classroom } from "./classroom.model";
import { Domvalue } from "./domvalue.model";

export class Course {
    id!: number;
    name!: string;
    description!: string;    
    category!: Domvalue;
    lectureHours!: number;
    labHours!: number;
    lectureRoom!: Classroom;
    labRoom!: Classroom;
    section!: string;
}
