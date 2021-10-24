import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/assets/constant';
import { Filter } from '../shared/filter.model';

@Injectable({
  providedIn: 'root'
})
export class SchedDetailService {

  constructor(private http: HttpClient, private cons: AppConstants) { }

  getSchedule(filter : Filter){  
    let sem = filter.sem;

    if(filter.type == 1){
      let prof = filter.prof;
      console.log(this.cons.BASEURL+ "/scheduleDetail/"+sem+"/prof/"+prof);
      return this.http.get(this.cons.BASEURL+ "/scheduleDetail/"+sem+"/prof/"+prof);
    }else{
      let room = filter.room;
      console.log(this.cons.BASEURL+ "/scheduleDetail/"+sem+"/classroom/"+room);
      return this.http.get(this.cons.BASEURL+ "/scheduleDetail/"+sem+"/classroom/"+room);
    }
  }

}
