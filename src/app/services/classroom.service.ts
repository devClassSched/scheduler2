import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/assets/constant';
import { Classroom } from '../shared/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  

  constructor(private http: HttpClient, private cons: AppConstants) { }

  listClassroom(){  
    return this.http.get(this.cons.BASEURL + "/classroom")
  }
  viewClassroom(id: string){
    return this.http.get(this.cons.BASEURL + "/classroom/"+id)
  }
  saveClassroom(classroom: Classroom){
    console.log(classroom);
    return this.http.post(this.cons.BASEURL+ "/classroom/",classroom);
  }
}
