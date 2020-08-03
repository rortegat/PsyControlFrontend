import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable } from '../models/pageable';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  /**
   * This is a Global place to add all the request headers for every REST calls
   */
  private baseUrl = '/api'
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(private http: HttpClient) { }

  page(url: string, pageable: Pageable, sort?: string): Observable<Page<any>> {
    url += `?page=${pageable.pageNumber}&size=${pageable.pageSize}`;
    if (sort)
      url += `?sort=${sort}`;
    console.log(url);
    return this.http.get<Page<any>>(this.baseUrl + url, { headers: this.httpHeaders });
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    return this.http.get(this.baseUrl + url, { headers: this.httpHeaders, params: urlParams });
  }

  post(url: string, body: Object): Observable<any> {
    return this.http.post(this.baseUrl + url, body, { headers: this.httpHeaders });
  }

  put(url: string, body: Object): Observable<any> {
    return this.http.put(this.baseUrl + url, body, { headers: this.httpHeaders });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url, {
      observe: 'response',
      "responseType": "text",
      headers: this.httpHeaders
    });

  }

}
