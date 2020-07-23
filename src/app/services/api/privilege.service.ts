import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';
import { Privilege } from 'src/app/models/privilege';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {

  private baseUrl = '/privileges'

  constructor(private request: RequestService) { }

  getPrivileges(): Observable<Privilege[]> {
    return this.request.get(`${this.baseUrl}/all`)
      .pipe(map(data => data as Privilege[]));
  }
}
