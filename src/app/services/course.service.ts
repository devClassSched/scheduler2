import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/assets/constant';
import { Course } from '../shared/course.model';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private cons: AppConstants) { }

  listCourse(){  
    return this.http.get(this.cons.BASEURL + "/course")
  }
  viewCourse(id: string){
    return this.http.get(this.cons.BASEURL + "/course/"+id)
  }
  saveCourse(course: Course){
    console.log(course);
    return this.http.post(this.cons.BASEURL+ "/course/",course);
  }
}
