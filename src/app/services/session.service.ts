import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUser: BehaviorSubject<User>;
  public token: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { 
    if(sessionStorage.getItem('user')!=null)
    this.currentUser = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
  }

  setUserData(user){
    this.currentUser.next(user);
    sessionStorage.setItem("user",JSON.stringify(user));
  }

  getUserData(user){
    if(sessionStorage.getItem('user')!=null)
    console.log(sessionStorage.getItem("user"))
  }

  removeUserData(){
    this.currentUser.next(null);
    sessionStorage.removeItem("user");
  }

  

}
