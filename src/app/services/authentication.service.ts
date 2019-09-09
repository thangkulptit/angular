import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenPayloadUser } from '../interface/token-interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { httpOptions, urlApiUserAngular } from '../util/url-api-services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  private timeNow = Date.now() / 1000;
  constructor(
      private http: HttpClient,
      private _router: Router
      ) { }

  public saveToken(token: string): void {
    localStorage.setItem(urlApiUserAngular.keyUserToken, token);
    this.token = token;      
  }

  public getToken(): string {
      if (!this.token) {
        this.token = localStorage.getItem(urlApiUserAngular.keyUserToken);
      }
      return this.token;
  }

  public getUserDetailDecodedToken(): UserDetails {
   try {
    const token = this.getToken();
    let payload;
    if (token) {
        payload = token.split('.')[1];
        payload = window.atob(payload);
        //console.log(JSON.parse(payload));
        return JSON.parse(payload);
    } else {
        return null;
    }
   } catch (error) {
      if (error) {
        this.token = '';
        window.localStorage.removeItem(urlApiUserAngular.keyUserToken);
      }
   }
  }

  // private  compareTokenLocalAndServer(): void {
  //   const token = this.getToken();
  //   const a =  this.profileUser(token).subscribe(data => {
  //     return data;
  //   })
  //   console.log(a);
  // }

  public isLoggedIn(): boolean {
      const user = this.getUserDetailDecodedToken();
      if (user) {
          return (user.exp - this.timeNow) > 0;
      } else {
          return false;
      }
  }

  public registerUser(user: TokenPayloadUser): Observable<any> {
      return this.http.post<any>(urlApiUserAngular.Register, user, httpOptions)
        .pipe(
            // map(data => {
            //     if (data.token) {
            //         this.saveToken(data.token);
            //     }
            // })
        )
  }

  public loginUser(user: TokenPayloadUser): Observable<any> {
    return this.http.post<any>(urlApiUserAngular.Login, user, httpOptions)
  }

 

  public getProfileUser(): Observable<any> {
    if ( this.getToken() ) {
      return this.http.get<any>(urlApiUserAngular.getProfileUser, { 
        headers: { 
          Authorization: `${this.getToken()}`
        } 
      })
    } 

  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem(urlApiUserAngular.keyUserToken);
    this._router.navigate(['/login']);
  }

}
