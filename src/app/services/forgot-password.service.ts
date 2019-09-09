import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Forgot } from '../interface/forgot-password';
import { urlForgotPassword, httpOptions } from '../util/url-api-services';
import { PayloadChangePass } from '../interface/payload-change.interface';
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  
  
  constructor(
      private http: HttpClient,
      private _router: Router
      ) { }
      public forgotPassword(dataForgot: Forgot): Observable<any> {
        return this.http.post<any>(urlForgotPassword.Forgot, dataForgot, httpOptions);

      }

      public doResetPasswordService(token: string, password: string): Observable<any> {
          const urlApi = urlForgotPassword.Reset + `/${token}` ;
          
          return this.http.post<any>(urlApi, {password}, httpOptions);
      }


}
