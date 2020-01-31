import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Consult } from 'src/app/models/consult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private baseUrl = '/consults';

  constructor(private request: RequestService) { }

  getConsults(id: number): Observable<Consult[]> {
    return this.request.get(`${this.baseUrl}/patient/${id}`).pipe(
      map(data => data as Consult[]))
  }

  getConsult(id:number): Observable<Consult>{
    return this.request.get(`${this.baseUrl}/${id}`)
  }

  createConsult(patientId:number, consult: Consult):Observable<Consult>{
    return this.request.post(`${this.baseUrl}/add/${patientId}`,consult)
  }

  deleteConsult(id: number):Observable<any>{
    return this.request.delete(`${this.baseUrl}/delete/${id}`)
  }
}
