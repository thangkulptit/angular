import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { AddCategoryProductComponent } from './components/add-category-product/add-category-product.component';
import { EditCategoryProductComponent } from './components/edit-category-product/edit-category-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService] },
  { path: 'category', component: CategoryProductComponent, canActivate: [AuthGuardService]  },
  { path: 'listproducts', component: ProductComponent, canActivate: [AuthGuardService] },
  { path: 'addproduct', component: AddproductComponent, canActivate: [AuthGuardService] },
  { path: 'editproduct/:id', component: EditProductComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'addcategory', component: AddCategoryProductComponent, canActivate: [AuthGuardService]},
  { path: 'editcategory/:id', component: EditCategoryProductComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: 'forgot', component: ForgotComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]


})
export class AppRoutingModule { }
