import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from 'src/app/models/auth-token';
import { RequestService } from '../request.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "/auth";

  constructor(private request: RequestService) { }

  logIn(username: string, password: string): Observable<AuthToken> {
    let loginBody = { "username": username, "password": password }
    return this.request.post(`${this.baseUrl}/login`, loginBody);
  }

  signUp(username: string, password: string, email: string): Observable<User> {
    let signUpBody = { "username": username, "password": password, "email": email }
    return this.request.post(`${this.baseUrl}/signup`, signUpBody);
  }

  logOut(): void{

  }
}
