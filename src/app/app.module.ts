import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AlertComponent } from './components/alert/alert.component';
import { ProductFilterPipe } from './pipe/products-filter.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { MaterialModule } from './material.module';
import { ProgressRouteComponent } from './components/progress-route/progress-route.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { AddCategoryProductComponent } from './components/add-category-product/add-category-product.component';
import { EditCategoryProductComponent } from './components/edit-category-product/edit-category-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { HttpErrorInterceptor } from './util/http-errors.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavMenuComponent,
    AddproductComponent,
    LoadingComponent,
    EditProductComponent,
    AlertComponent,
    ProductFilterPipe,
    ProgressRouteComponent,
    MatConfirmDialogComponent,
    CategoryProductComponent,
    AddCategoryProductComponent,
    EditCategoryProductComponent,
    LoginComponent,
    RegisterComponent,
    ProfileUserComponent,
    PageNotFoundComponent,
    ForgotComponent,
    ResetPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MaterialModule, // material module
    BrowserAnimationsModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AuthGuardService,
    

  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
