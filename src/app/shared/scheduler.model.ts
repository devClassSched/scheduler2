import { Semester } from "./semester.model";

export class Scheduler {
    status!: string;
    totalCourses!: number;
    completedCourses!: number;
    courseNotCompleted!:number;
    sem!: Semester;
}
