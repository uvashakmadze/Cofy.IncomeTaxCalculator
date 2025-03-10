import {
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const authToken = "Q29meUFkbTpDb2Z5IUAjMTIz"; // Please see basic UserName and Password in Backend appsettings.json file

    if (authToken) {
      // Clone the request and set the token in header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Basic ${authToken}`
        }
      });

      return next(authReq);
    }

    // If there is no token, pass the original request
    return next(req);
}