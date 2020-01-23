import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private baseUrl = '/users';

  constructor(private request: RequestService) { }

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
