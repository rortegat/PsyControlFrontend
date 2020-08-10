import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthToken } from '../models/auth-token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public theme: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private storage = localStorage;

  constructor() {
    if (this.getUserData() != null) {
      this.currentUser = new BehaviorSubject<User>(this.getUserData());
    }
    if (this.getPreferredTheme() != null) {
      this.theme.next(this.getPreferredTheme());
    }
  }

  setTokenData(auth: AuthToken): void{
    this.storage.setItem("auth", JSON.stringify(auth));
  }

  getTokenData(): AuthToken | null{
    let auth: string = this.storage.getItem("auth");
    return auth
    ? JSON.parse(auth)
    : null;
  }

  removeTokenData(): void{
    this.storage.removeItem("auth");
  }

  setUserData(user: User): void {
    this.currentUser.next(user);
    this.storage.setItem("user", JSON.stringify(user));
  }

  getUserData(): User | null {
    let user: string = this.storage.getItem('user');
    return user
      ? JSON.parse(user)
      : null;
  }

  removeUserData(): void {
    this.currentUser.next(null);
    this.storage.removeItem("user");
  }

  setPreferredTheme(theme: boolean): void {
    this.storage.setItem("theme", JSON.stringify({ "dark": theme }))
  }

  getPreferredTheme(): boolean | null {
    return this.storage.getItem("theme")
      ? JSON.parse(this.storage.getItem("theme")).dark
      : null;
  }

  changeTheme(): void {
    this.setPreferredTheme(!this.theme.getValue());
    this.theme.next(!this.theme.getValue());
  }



}
