import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    return localStorage.getItem('authUser')
      ? JSON.parse(localStorage.getItem("authUser"))
      : null;
  }

  removeUserData(): void {
    this.currentUser.next(null);
    localStorage.removeItem("authUser");
  }

  setPreferredTheme(theme: boolean) {
    localStorage.setItem("theme", JSON.stringify({ "dark": theme }))
  }

  getPreferredTheme(): boolean | null {
    return localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme")).dark
      : null;
  }

  changeTheme(): void {
    this.setPreferredTheme(!this.theme.getValue());
    this.theme.next(!this.theme.getValue());
  }



}
