import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl='/files'
  
  constructor(private request: RequestService) { }

  uploadSingleFile(data):Observable<any>{
    return this.request.post(`${this.baseUrl}/upload`,data)
  }

}
