import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorComponent } from '../components/modal/server-error/server-error.component';
import { ApplicationErrorComponent } from '../components/modal/application-error/application-error.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private session: SessionService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //if (req.url.includes("/api")) {

    let user = this.session.getUserData()
    if (user != null) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${user.token}`,
        },
      })
    }

    return next.handle(request).pipe(
      catchError(
        (error) => {
          if (error.status === 401) {
            const dialogRef = this.dialog.open(ApplicationErrorComponent, {
              width: '300px',
              data: error
            })
            dialogRef.afterClosed().subscribe(() => {
              this.session.removeUserData()
              this.router.navigate(['login'])
            })
          }
          else if (error.status === 500) {
            console.log(error)
          }
          else {
            this.dialog.open(ServerErrorComponent, {
              width: '300px',
              data: error
            })
          }
          this.session.loading.next(false)

          return throwError(error)
        }) as any
    )

  }



}



