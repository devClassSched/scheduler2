import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.post(this.cons.BASEURL+ "/scheduler/",scheduler);
  }

  deleteScheduler(scheduler: Scheduler): Observable<any>{
    return this.http.post(this.cons.BASEURL+ "/scheduler/process",scheduler);
  }
}
