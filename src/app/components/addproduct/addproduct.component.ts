import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryProduct } from '../../model/category-product.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { AlertService } from '../../services/alert.service';
import { AlertInterface, TypeAlert } from '../../interface/alert-interface';
import { AlertModel } from '../../model/alert-model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  categories: CategoryProduct[];
  submitted = false; //True la Hidden con False la Display
  formProduct;
  responseMessageAdd = false;
  

  objectModel = {};

  constructor(
    private productService: ProductService,
    private _router: Router,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.getCategoryProducts();
    this.InitForm();
  }


  isValid(controlName): boolean {
    return this.formProduct.get(controlName).invalid && this.formProduct.get(controlName).touched;
  }

  isValidTouched(controlName): boolean {
    return this.formProduct.get(controlName).touched;
  }
  
  public async getCategoryProducts() {
    await this.productService.getCategoryProducts()
      .subscribe(category => this.categories = category.data) //lay data 
  }

  onSubmit() {
    this.addProduct(this.formProduct.value);
  }

  public async addProduct(dataProduct: Product) {
    await this.productService.addProductService(dataProduct)
            .subscribe(resJSON => { this.ShowAlert(resJSON.message) });
  }

  private async ShowAlert(responseMessageAdd: string = ''): Promise<void>{
    if(responseMessageAdd != '' && responseMessageAdd === 'Product created Success') {
       // Thêm thành công hiện alert Success
       const alertAddSuccess: AlertModel = new AlertModel(TypeAlert.Success, 'Add product success.');
       this.alertService.addAlertMessage(alertAddSuccess);
       this._router.navigate(['']);
      
     // this._router.navigate(['listproducts']);
    }else{
      //Thêm thất bại hiện alert Faild
      const alertAddFaild: AlertModel = new AlertModel(TypeAlert.Faild, 'Add product Faild');
      this.alertService.addAlertMessage(alertAddFaild);
      this._router.navigate(['']);
    }
  }
 

  private InitForm(): void {
    this.formProduct = new FormGroup({
      id_category: new FormControl("", [
        Validators.required,
      ]),
      name: new FormControl("", [
        Validators.required,
       
      ]),
      description: new FormControl("", [
        Validators.required,
      ]),
      price: new FormControl("", [
        Validators.required,

      ]),
    });
  }

}
