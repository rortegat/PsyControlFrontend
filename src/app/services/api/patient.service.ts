import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Patient } from 'src/app/models/patient';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Pageable } from 'src/app/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = '/patients';

  constructor(private request: RequestService) { }

  getPatients(pageable: Pageable): Observable<Page<Patient>> {
    return this.request.page(`${this.baseUrl}/all`, pageable);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.request.post(`${this.baseUrl}/add`, patient);
  }

  getPatient(id: number): Observable<Patient> {
    return this.request.get(`${this.baseUrl}/${id}`);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.request.put(`${this.baseUrl}/update`, patient);
  }

  deletePatient(id: number): Observable<Patient> {
    return this.request.delete(`${this.baseUrl}/delete/${id}`);
  }
}
