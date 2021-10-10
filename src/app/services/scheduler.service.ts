import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from 'src/assets/constant';
import { Scheduler } from '../shared/scheduler.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

 
  constructor(private http: HttpClient, private cons: AppConstants) { }

  listScheduler(){  
    return this.http.get(this.cons.BASEURL + "/scheduler")
  }

  saveScheduler(scheduler: Scheduler){
    console.log(scheduler);
    return this.http.post(this.cons.BASEURL+ "/scheduler/",scheduler);
  }
}
