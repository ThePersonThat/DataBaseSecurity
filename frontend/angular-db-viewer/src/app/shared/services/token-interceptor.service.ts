import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = this.setAuthHeader(req);
    }

    return next.handle(req).pipe(
      catchError(error => this.handleAuthError(error))
    );
  }


  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: this.auth.getJwtToken()
      }
    });
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if(error.status === 401 || error.status === 403) {
      this.auth.logout();
    }

    return throwError(error);
  }
}
