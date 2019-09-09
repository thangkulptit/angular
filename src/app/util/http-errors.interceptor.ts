import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { retry, catchError } from 'rxjs/operators';
   import { Router } from '@angular/router';
import { ErrorParams } from '../interface/error-params-interface';
import { AuthenticationService } from '../services/authentication.service';
   
   export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
      private _route: Router,
      private auth: AuthenticationService
      ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //Thêm tokens vào headers Authorization
      if( this.auth.getToken() ) {
        request = this.addTokenToHeaders(request, this.auth.getToken());
      }

      return next.handle(request)
        .pipe(
          retry(1),
          catchError((error: HttpErrorResponse) => {
            this.handleError404(error);
            // this.handleErrorStatus0(error);
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Client Error: ${error.error.message}`;
              const status = error.status;
              const err: ErrorParams = {
                error: errorMessage,
                fromError: 'client',
                status: status 
              }
              this._route.navigate(['/not-found'], {queryParams: err});
            } else {
              // server-side error
              const status = error.status;
              errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
              const err: ErrorParams = {
                error: errorMessage,
                fromError: 'server',
                status: status
              }
              this._route.navigate(['/not-found'], {queryParams: err});
            }          

            return throwError(errorMessage);
          })
        )
    }

    private addTokenToHeaders(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          'Authorization': `bearer ${token}`,
        }
      });
    }

    private handleError404(error: HttpErrorResponse): Observable<any> {
      if (error.error instanceof ErrorEvent && error.status == 404) {
        this._route.navigateByUrl('/not-found', {replaceUrl: true});
        return throwError(error.error);
      }
    }
    
   }