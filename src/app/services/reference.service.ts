import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/assets/constant';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  
  constructor(private http: HttpClient, private cons: AppConstants) { }

  getCatgeory(){  
    return this.http.get(this.cons.BASEURL + "/domainValue/object/"+this.cons.DOMAIN_TYPE);
  }
  
}
