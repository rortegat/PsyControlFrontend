import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = '/roles'

  constructor(private request: RequestService) { }

  getRole(id: number): Observable<Role> {
    return this.request.get(`${this.baseUrl}/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.request.get(`${this.baseUrl}/all`).pipe(map(data => data as Role[]));
  }

  createRole(role: Role): Observable<Role>{
    return this.request.post(`${this.baseUrl}/add`, role);
  }

  updateRole(role: Role): Observable<Role>{
    return this.request.put(`${this.baseUrl}/update`, role);
  }

  deleteRole(id: number): Observable<any>{
    return this.request.delete(`${this.baseUrl}/delete/${id}`);
  }


}
