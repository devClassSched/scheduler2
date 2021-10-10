import { Domvalue } from "./domvalue.model";

export class Course {
    id!: number;
    name!: string;
    description!: string;    
    category!: Domvalue;
    lectureHours!: number;
    labHours!: number;
}
