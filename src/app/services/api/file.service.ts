import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  uploadURL: string = "http://localhost:8080/files";

  constructor(private httpClient: HttpClient) { }

  uploadSingleFile(data): Observable<any> {
    return this.httpClient.post<any>(`${this.uploadURL}/upload`, data, {
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

  downloadSingleFile(filename: string): Observable<any> {
    return this.httpClient.get<any>(`${this.uploadURL}/download`)
  }

}
