import { AbstractControl } from '@angular/forms';
import { Password } from '../model/user.model';

export class Validator {
    public static validateConfirmPassword(control: AbstractControl): { [key: string]: any} | null {
        const passwordObject: Password = control.value;
        const password = passwordObject.password;
        const confirmPassword = passwordObject.c_password;
        if (password == confirmPassword) {
          return null;
        } else {
          return {validateConfirmPassword: false};
        }
    }
}