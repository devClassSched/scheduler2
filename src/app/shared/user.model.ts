import { Domvalue } from "./domvalue.model";

export class User {
    id: any;
    name!: string;
    password!: string;
    specialization!: Domvalue[];
    role!: string;
    allocatedHours!: number;    
}
