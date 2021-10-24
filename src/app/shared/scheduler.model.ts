import { Semester } from "./semester.model";

export class Scheduler {
    id!:number;
    status!: string;
    totalCourses!: number;
    completedCourses!: number;
    courseNotCompleted!:number;
    sem!: Semester;
}
