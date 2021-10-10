import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/assets/constant';
import { Semester } from '../shared/semester.model';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private http: HttpClient, private cons: AppConstants) { }

  listSemester(){  
    return this.http.get(this.cons.BASEURL + "/semester")
  }
  viewClassroom(id: string){
    return this.http.get(this.cons.BASEURL + "/semester/"+id)
  }
  saveSemester(semester: Semester){
    console.log(semester);
    return this.http.post(this.cons.BASEURL+ "/semester/",semester);
  }

  getSemesterNotIn(){
    return this.http.get(this.cons.BASEURL + "/semesterNotIn");
  }
}
