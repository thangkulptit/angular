import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenPayloadUser } from '../../interface/token-interface';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  loginForm;
  constructor(
     private _route: Router,
     private auth: AuthenticationService,
     private toast: ToastrService
     ) { }

  ngOnInit() {
    this.initFormLogin();
    this.checkIsLogin();
    // this.auth.profileUser()
    //   .subscribe(data => {
    //     console.log(data);
    //   })
  }

  private checkIsLogin() {
    if (this.auth.isLoggedIn()) {
      this._route.navigate(['/profile']);
    }
  }

  onLogin() {
    this.showSpinner = true;
    const data: TokenPayloadUser = this.loginForm.value;
    // const time =  Date.now();
    // console.log(time);
    this.auth.loginUser(data)
      .subscribe(dataRes => {
        // setTimeout(()=>{
        //   this.handleResponseLogin(dataRes);
        //   this.showSpinner = false;
        // },3000
        // )
          this.handleResponseLogin(dataRes);
          this.showSpinner = false;
          
 
      })
  }

  private handleResponseLogin(dataRes: any): void {
    const { message, status, token } = dataRes;

    if (message === 'user not exist' && status === '0') {
      //tai khoan khong ton tai
      this.toast.error('Username does not exist!');
      this._route.navigate(['/login']);
    } else {
      if (message === 'login success' && status === '1' && token ) {
        //dang nhap thanh cong
        this.auth.saveToken(token); // luu token vao localstorage
       
        this.toast.success('Success! Login success');
        this._route.navigate(['profile']);
        
        
        //console.log(this.auth.getUserDetails()); 
      } else {
        //Sai mat khau
        this.toast.warning('Wrong! Wrong password.');
        this._route.navigate(['/login']);
      }
    }   
  }

  isValid(controlName): boolean {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  private initFormLogin(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),

    })
  }

  clickRegister() {
    this._route.navigate(['register']);
  }
  onClickForgot() {
    this._route.navigate(['forgot']);
  }

}
