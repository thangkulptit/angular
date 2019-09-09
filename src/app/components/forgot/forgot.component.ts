import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  showSpinner = false;
  forgotForm;
  isSend = true;
  emailUser;
  constructor(
     private _route: Router,
     private fgService: ForgotPasswordService,
     private toast: ToastrService
     ) { }
  ngOnInit() {
    this.initForm();
    this.emailUser = this.forgotForm.value.email;
  }

  onForgot() {
    this.showSpinner = true;
    this.fgService.forgotPassword(this.forgotForm.value)
      .subscribe(data => {
        this.handleResponseForGot(data.message);
      })
  }

  private handleResponseForGot(message: string){
    if (message === 'user does not exists') {
      this.toast.error('User not exists', 'Error?');
    } else if ( message === 'email wrong' ) {
      this.toast.error('Wrong email !', 'Error?');
    } else if ( message === 'send mail success') {
      this.showSpinner = false;

      //close form 
      this.isSend = false;
    }
    
  }

  private initForm(): void {
    this.forgotForm = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),

    })
  }

  isValid(controlName): boolean {
    return this.forgotForm.get(controlName).invalid && this.forgotForm.get(controlName).touched;
  }

}
