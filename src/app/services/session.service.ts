import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { AuthenticatedUser } from '../models/authenticated-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUser: BehaviorSubject<AuthenticatedUser> = new BehaviorSubject<AuthenticatedUser>(null)
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public theme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private router: Router
  ) {
    if (this.getUserData() != null) {
      this.currentUser = new BehaviorSubject<AuthenticatedUser>(this.getUserData())
      //this.router.navigate(["home"])
    }
    if (this.getPreferredTheme() != null) {
      this.theme.next(this.getPreferredTheme())
    }
  }

  setUserData(user: AuthenticatedUser) {
    this.currentUser.next(user)
    localStorage.setItem("authUser", JSON.stringify(user))
  }

  getUserData(): AuthenticatedUser | null {
    if (localStorage.getItem('authUser') != null)
      return JSON.parse(localStorage.getItem("authUser"))
    else
      return null
  }

  removeUserData() {
    this.currentUser.next(null);
    localStorage.removeItem("authUser");
  }

  setPreferredTheme(theme: boolean) {
    localStorage.setItem("theme", JSON.stringify({ "dark": theme }))
  }

  getPreferredTheme(): boolean | null {
    if (localStorage.getItem("theme") != null)
      return JSON.parse(localStorage.getItem("theme")).dark
    else return null
  }

  changeTheme() {
    this.setPreferredTheme(!this.theme.getValue())
    this.theme.next(!this.theme.getValue())
  }



}
