import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { AuthenticatedUser } from '../models/authenticated-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUser: BehaviorSubject<AuthenticatedUser>=new BehaviorSubject<AuthenticatedUser>(null);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor( 
    private router: Router
  ) { 
    if(sessionStorage.getItem('authUser')!=null){
    this.currentUser = new BehaviorSubject<AuthenticatedUser>(JSON.parse(sessionStorage.getItem('authUser')))
    this.router.navigate(["home"])
    }
  }

  setUserData(user: AuthenticatedUser){
    this.currentUser.next(user)
    sessionStorage.setItem("authUser",JSON.stringify(user))
  }

  getUserData():AuthenticatedUser | null{
    if(sessionStorage.getItem('authUser')!=null)
    return JSON.parse(sessionStorage.getItem("authUser"))
    else
    return null
  }

  removeUserData(){
    this.currentUser.next(null);
    sessionStorage.removeItem("authUser");
  }

  

}
