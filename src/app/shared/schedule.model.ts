import { Course } from "./course.model";
import { Domvalue } from "./domvalue.model";
import { Semester } from "./semester.model";
import { User } from "./user.model";

export class Schedule {
    id!: number;
    semester!: Semester;
    professor!: User;
    course!: Course;
}
