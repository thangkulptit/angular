import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validator } from '../../util/validator';
import { PayloadChangePass } from '../../interface/payload-change.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token;
  isChange = true;
  showSpinner = false;
  formChange
  constructor(
    private route: ActivatedRoute,
    private forgotPasswordService: ForgotPasswordService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getTokenFormUrl();
    this.initForm();
  }

  isValid(controlName): boolean {
    return this.formChange.get(controlName).invalid && this.formChange.get(controlName).touched;
  }

  private initForm(): void {
    this.formChange = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      c_password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
    }, {validators: Validator.validateConfirmPassword} )
  }

  private getTokenFormUrl(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    this.showSpinner = true;
    const password: string = this.formChange.value.password;
    
    this.forgotPasswordService.doResetPasswordService(this.token, password)
      .subscribe(result => {
        this.handleResponseChange(result.message);
      })
  }

  private handleResponseChange(message: string): void {
    console.log(message);
    if ( message === 'Doi Password Thanh Cong!') {
      this.toast.success('Đổi mật khẩu thành công!', 'Success');
      this.showSpinner = false;
      this.isChange = false;
    } else {
      this.toast.error('Đổi mật khẩu thất bại !', 'Error');
      this.showSpinner = false;
    }
  }

}
