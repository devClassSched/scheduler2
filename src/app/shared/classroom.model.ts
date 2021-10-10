import { Domvalue } from "./domvalue.model";

export class Classroom {
    id!: number;
    name!: string;
    description!: string;
    coursetype!: string;
    category! : Domvalue[];
}
