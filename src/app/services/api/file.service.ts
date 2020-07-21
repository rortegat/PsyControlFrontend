import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FileResource } from 'src/app/models/file-resource';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = "/api/files";
  private httpHeaders = new HttpHeaders({ 
    'Content-Type': 'application/json',
   })

  constructor(private httpClient: HttpClient) { }

  getAllUserFiles(): Observable<FileResource[]>{
    return this.httpClient.get<FileResource[]>(`${this.baseUrl}/all`,{headers:this.httpHeaders})
    .pipe(map(data => data as FileResource[]));

  }

  uploadSingleFile(file: any): Observable<any> {
    let formData = new FormData()
    formData.append('file', file)
    return this.httpClient.post<any>(`${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    )
  }

  deleteFile(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/delete/${id}`,{ 
    observe: 'response',
    headers: this.httpHeaders});
  }

}
