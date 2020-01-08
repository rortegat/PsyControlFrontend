import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
/**
 * This is a Global place to add all the request headers for every REST calls
 */
private baseUrl = 'http://localhost:8080';
private httpHeaders = new HttpHeaders({ 
  'Content-Type': 'application/json',
 });

 constructor(private http: HttpClient) {}

get(url:string, urlParams?:HttpParams):Observable<any>{
    return this.http.get(this.baseUrl + url, {headers:this.httpHeaders,  params:urlParams} );
}

post(url:string, body:Object):Observable<any>{
    return this.http.post(this.baseUrl + url, body, { headers:this.httpHeaders});
}

put(url:string, body:Object):Observable<any>{
    return this.http.put(this.baseUrl + url, body, { headers:this.httpHeaders});
}

delete(url:string):Observable<any>{
    return this.http.delete(this.baseUrl + url, { headers:this.httpHeaders});
}
}
