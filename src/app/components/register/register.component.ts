import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Password, User } from '../../model/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { TokenPayloadUser } from '../../interface/token-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;
  showSpinner = false;

  constructor(
    private _route: Router,
    private auth: AuthenticationService,
    private toast: ToastrService
    ) { }

  ngOnInit() {
    this.initFormRegister();
  }
  isValid(controlName): boolean {
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;
  }

  private filterFullname(fullname: string) : string {
    let str = '';
    str = fullname.toLowerCase(); 
    str = str.replace(/  +/g, ' ');
    const arrName: string[] = str.split(' ');

    let stringReturn: string = '';
    for (let key in arrName) {
      let nameOfKey: string = arrName[key].substring(0, 1).toUpperCase() + arrName[key].substring(1) + ' ';
      stringReturn += nameOfKey;
    }
    stringReturn = stringReturn.trim();
    return stringReturn;
  }

  onRegister() {
   this.showSpinner = true;
   const data: User = this.registerForm.value;
    const fullnameFiltered: string = this.filterFullname(data.fullname);
    const userForm: TokenPayloadUser = {
      username: data.username,
      password: data.passwords.password,
      fullname: fullnameFiltered,
      email: data.email
    }
    this.auth.registerUser(userForm) // Goi den service Dang ky user
      .subscribe(resResult => {
        this.handleResponseRegisterUser(resResult);
        this.showSpinner = false;
    })
  }

  private handleResponseRegisterUser(resResult) {
    const { message, status, token } = resResult;
    if( message === 'user already exists' && status === '0' && !token ) {
      //Dang ky that bai User da ton tai
      this.toast.error('Faild! User already exists.');
    } else if (message === 'register user success' && status === '1' && token) {
       //dang ky thanh cong
       this.toast.success('Success! Register user success.');
       this._route.navigate(['/login']);
       
       //Lam` them neu muon login luon sau khi dang ky' Luu Token xuong localstorage ngay
       this.auth.saveToken(token);

    } else {
      this.toast.warning('Faild! Something goes Wrong!');
    }
    
  }


  clickButtonLogin() {
    this._route.navigate(['login']);
  }
  private initFormRegister(): void {
    const regexPaternEmail = '^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$';
    this.registerForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      passwords: new FormGroup({
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ]),
        c_password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),

        ])
      }, { validators: validateConfirmPassword }),
      fullname: new FormControl("", [
        Validators.required,
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(regexPaternEmail)
      ]),

    })
  }

  // private validateEmail(email: string) {
  //   const emailRegex = new RegExp('^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$');
  //   return emailRegex.test(email) ? emailRegex.test(email) : 'null';
  // }

}

function validateConfirmPassword(control: AbstractControl): { [key: string]: any} | null {
    const passwordObject: Password = control.value;
    const password = passwordObject.password;
    const confirmPassword = passwordObject.c_password;
    if (password == confirmPassword) {
      return null;
    } else {
      return {validateConfirmPassword: false};
    }
}

