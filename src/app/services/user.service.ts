import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/assets/constant';
import { User } from '../shared/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cons: AppConstants) { }

  listUser(){  
    return this.http.get(this.cons.BASEURL + "/user")
  }
  viewUser(id: string){
    return this.http.get(this.cons.BASEURL + "/user/"+id)
  }
  saveUser(user: User){
    console.log(user);
    return this.http.post(this.cons.BASEURL+ "/user/",user);
  }
  getAllProf(){  
    return this.http.get(this.cons.BASEURL + "/user/professor")
  }
}
