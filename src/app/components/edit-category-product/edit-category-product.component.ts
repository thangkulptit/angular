import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryProductService } from '../../services/category-product.service';
import { AlertService } from '../../services/alert.service';
import { TypeAlert } from '../../interface/alert-interface';
import { AlertModel } from '../../model/alert-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryProduct } from '../../model/category-product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category-product',
  templateUrl: './edit-category-product.component.html',
  styleUrls: ['./edit-category-product.component.css']
})
export class EditCategoryProductComponent implements OnInit {
  formEdit: FormGroup;
  idFromUrl: number;
  categoryResponse: CategoryProduct;

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private categoryService: CategoryProductService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.InitFormCategory();
    this.getIdFormUrl(); //lay URL
    this.getCategoryById();
  }

  private getIdFormUrl() {
    this.idFromUrl = +this.route.snapshot.paramMap.get('id');
  }

  private getCategoryById() {
    this.categoryService.getCategoryProductByIdService(this.idFromUrl)
      .subscribe(category => {
        this.categoryResponse = category.data;
        this.formEdit = new FormGroup({
          name: new FormControl(this.categoryResponse.name, [
            Validators.required,
          ])
          
        });
      } );
  }

  onCategoryEditSubmit() {
    const dataSubmit: CategoryProduct = this.formEdit.value;
    this.categoryService.updateCategoryProductByIdService(this.idFromUrl, dataSubmit)
      .subscribe(resJson => {
        this.handleResponseEdit(resJson.message, this.idFromUrl);
      })
  }
  private handleResponseEdit(message: string, id: number) {
    if (message !== '' && message === 'Category update success') {
      // Thanh cong
      //Alert Thanh cong
      // const categoryEditSuccess: AlertModel = new AlertModel(TypeAlert.Success, `Update Category id = ${id} Success`);
      // this.alertService.addAlertMessage(categoryEditSuccess);
      this.toastrService.success(`Update Category id = ${id} Success`, 'Success!')
      this._route.navigate(['category']); 
    } else {
      // const categoryEditSuccess: AlertModel = new AlertModel(TypeAlert.Faild, `Update Category id = ${id} Faild`);
      // this.alertService.addAlertMessage(categoryEditSuccess);
      this.toastrService.error(`Update Category id = ${id} Faild`, 'Faild!')
      this._route.navigate(['category']); 
    }
  }

  private InitFormCategory(): void {
    this.formEdit = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
      ])
      
    });
  }

}
