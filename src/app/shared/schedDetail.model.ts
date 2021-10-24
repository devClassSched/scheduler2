import { Classroom } from "./classroom.model";
import { Domvalue } from "./domvalue.model";
import { Schedule } from "./schedule.model";

export class ScheduleDetail {
    id!: number;
    schedule!: Schedule;
    classroom!: Classroom;
    day!: string;    
    startTime!: string;
    endTime! : string;
    courseType! : string;
}
