import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryProduct } from '../../model/category-product.model';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { AlertModel } from '../../model/alert-model';
import { TypeAlert } from '../../interface/alert-interface';
import { AlertService } from '../../services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  formEditProduct;
  categories: CategoryProduct[];
  idGetFromUrl; //lay duoc khi lay tu url
  productEdit: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private _router: Router,
    private alertService: AlertService,
    private spinnerService: NgxSpinnerService
    ) {}
    
  ngOnInit() {
    this.InitForm();
    this.getIdUrlEdit(); //Lay id tren url
    this.getCategoryProducts(); //Lay CategoryProduct tu URL
    this.getProductById(this.idGetFromUrl); //Lay product tu Id tren url
  }
  
  isValid(controlName): boolean {
    return this.formEditProduct.get(controlName).invalid && this.formEditProduct.get(controlName).touched;
  }

  isValidTouched(controlName): boolean {
    return this.formEditProduct.get(controlName).touched;
  }

  private InitForm(): void { 
    this.formEditProduct = new FormGroup({
      id_category: new FormControl('', [
        Validators.required,
      ]),
      name: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      price: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  public getCategoryProducts() {
    this.productService.getCategoryProducts()
      .subscribe(category => {this.categories = category.data;}) //lay data 
  }

  private getIdUrlEdit(): void {
    this.idGetFromUrl = +this.route.snapshot.paramMap.get('id'); //lay id tren trinh duyet
  }

  private getProductById(id: number) {
      this.productService.getProductByIdService(id)
      .subscribe(product => {
        this.productEdit = product.data;
        console.log(this.productEdit);
        this.formEditProduct = new FormGroup({
          id_category: new FormControl(this.productEdit.id_category, [
            Validators.required,
          ]),
          name: new FormControl(this.productEdit.name, [
            Validators.required,
           
          ]),
          description: new FormControl(this.productEdit.description, [
            Validators.required,
          ]),
          price: new FormControl(this.productEdit.price, [
            Validators.required,
          ]),
        });
      } );
  }

  private async doEditProductById(id: number, dataProductForm: Product): Promise<void> {
    await this.productService.updateProductById(id, dataProductForm)
        .subscribe(resJson => {
          this.handleUpdateProduct(resJson.message, id);
        });
  }

  private handleUpdateProduct(message: string, id: number) {
    if (message !== '' && message === 'product update success') {
      //Update success
      this._router.navigate(['']);
      const alertUpdateSuccess: AlertModel = new AlertModel(TypeAlert.Success, `Update product id = ${id} success.`);
      this.alertService.addAlertMessage(alertUpdateSuccess); 
    }
  }
  //On Submit
  onSubmit() {
    this.spinnerService.show();
    const data: Product = this.formEditProduct.value;
    this.doEditProductById(this.idGetFromUrl, data);
    this.spinnerService.hide();   
  }
}
