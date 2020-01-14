import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';
import { AuthenticatedUser } from '../models/authenticated-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private request: RequestService) { }

  authenticate(username: string, password: string):Observable<AuthenticatedUser> {
    let login = { "username": username, "password": password }
    return this.request.post("/users/login", login)
  }
}
