import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes("/api")) {

      //let user = this.session.getUserData;
      let user =  JSON.parse(sessionStorage.getItem("user"))
      if (user.token) {
       console.log(user.token)

        req = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
      }


    }

    return next.handle(req);
  }
}