import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Patient } from 'src/app/models/patient';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = '/patients';

  constructor(private request: RequestService) { }

  getPatients(): Observable<Patient[]> {
    return this.request.get(`${this.baseUrl}/all`).pipe(
      map(data => data as Patient[]));
  }

  createPatient(patient: Patient):Observable<Patient>{
    return this.request.post(`${this.baseUrl}/add`, patient);
  }

  getPatient(id: number): Observable<Patient> {
    return this.request.get(`${this.baseUrl}/${id}`);
  }

  updatePatient(patient:Patient): Observable<Patient> {
    return this.request.put(`${this.baseUrl}/update`, patient);
  }

  deletePatient(id:number): Observable<Patient>{
    return this.request.delete(`${this.baseUrl}/delete/${id}`);
  }
}
