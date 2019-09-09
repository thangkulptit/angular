import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthenticationService, private _router: Router) { }

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      //chua dang nhap
      this._router.navigateByUrl('/login');
      return false;
    } 
    return true;
  }
}
