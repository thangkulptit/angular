import { HttpHeaders } from '@angular/common/http';
export const urlApiProduct = {
    GetOrPost: 'http://localhost:5000/front/products',
    Action:    'http://localhost:5000/front/products/'
}

export const urlApiCategoryProduct = {
    GetOrPost: 'http://localhost:5000/front/categoryproducts',
    Action:    'http://localhost:5000/front/categoryproducts/'
}

export const urlApiUserAngular = {
  Register: 'http://localhost:5000/front/register',
  Login: 'http://localhost:5000/front/login',
  getProfileUser: 'http://localhost:5000/front/profile',
  keyUserToken: 'userToken',

}

export const urlForgotPassword = {
  Forgot: 'http://localhost:5000/front/forgot',
  Reset: 'http://localhost:5000/front/reset'
}

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }