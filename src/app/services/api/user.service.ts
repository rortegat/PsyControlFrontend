import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticatedUser } from 'src/app/models/authenticated-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private baseUrl = '/users';

  constructor(private request: RequestService) { }


  logIn(username: string, password: string):Observable<AuthenticatedUser> {
    let loginBody = { "username": username, "password": password }
    return this.request.post(`${this.baseUrl}/login`, loginBody)
  }

  signUp(username:string, password:string, email:string):Observable<User>{
    let signUpBody={"username":username,"password":password,"email":email}
    return this.request.post(`${this.baseUrl}/signup`,signUpBody)
  }

  getUsers():Observable<User[]>{
    return this.request.get(`${this.baseUrl}/all`);
  }

  createUser(user: User):Observable<User>{
    return this.request.post(`${this.baseUrl}/add`, user);
  }

  getUser(username: string): Observable<User> {
    return this.request.get(`${this.baseUrl}/${username}`);
  }

  updateUser(user: User): Observable<User>{
    return this.request.put(`${this.baseUrl}/update`,user);
  }

  deleteUser(username: string): Observable<any>{
    return this.request.delete(`${this.baseUrl}/delete/${username}`);
  }
}
