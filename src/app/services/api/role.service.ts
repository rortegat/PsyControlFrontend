import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl='/roles'

  constructor(private request: RequestService) { }

  getRoles():Observable<Role[]>{
    return this.request.get(`${this.baseUrl}/all`)
  }

}
