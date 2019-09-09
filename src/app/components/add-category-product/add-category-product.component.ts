import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryProduct } from '../../model/category-product.model';
import { CategoryProductService } from '../../services/category-product.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TypeAlert } from '../../interface/alert-interface';
import { AlertModel } from '../../model/alert-model';

@Component({
  selector: 'app-add-category-product',
  templateUrl: './add-category-product.component.html',
  styleUrls: ['./add-category-product.component.css']
})
export class AddCategoryProductComponent implements OnInit {
  formCategoryProduct;
  private dataForm: CategoryProduct;
  constructor(
    private categoryProductService: CategoryProductService,
    private alertService: AlertService,
    private _router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.alertService.clearAlertMessage();
    this.InitFormCategory();
  }

  onSubmit() {
    this.dataForm = this.formCategoryProduct.value;
    this.addCategory(this.dataForm);
  }

  private addCategory(dataJson: CategoryProduct) {
    this.categoryProductService.addCategoryProductService(dataJson)
      .subscribe(resJSON => {
        this.handleResponseAddCategory(resJSON.message);
      })
  }

  private handleResponseAddCategory(message: string) {
    if(message !== '' && message === 'Category created Success') {
      //Add Success
      //show Alert
      // const showAlert: AlertModel = new AlertModel(TypeAlert.Success, 'Add category product success.');
      // this.alertService.addAlertMessage(showAlert); 
      this.toastrService.success('Add category product success.','Success!')
      this._router.navigate(['category']);
    }
  }

  private InitFormCategory(name: string = '' ): void {
    this.formCategoryProduct = new FormGroup({
     
      name: new FormControl(name, [
        Validators.required,
       
      ])
      
    });
  }


}
