import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private session: SessionService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //if (req.url.includes("/api")) {

    let user = this.session.getUserData()
    if (user != null) {
      console.log(user.token)

      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${user.token}`,
        },
      })
    }

    return next.handle(request).pipe(
      catchError(
        (error) => {
          console.log(error)
          if (error.status === 403) {
            console.log('No authorized ' + error.status)
            this.session.loading.next(false)
            // this.session.removeUserData()
            // this.router.navigate(['login'])
          }
          return throwError(error)
        }) as any
    )

  }



}



