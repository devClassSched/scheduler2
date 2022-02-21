import { Classroom } from "./classroom.model";
import { Domvalue } from "./domvalue.model";
import { Semester } from "./semester.model";

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
    semester!: Semester;
}
