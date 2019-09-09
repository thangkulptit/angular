import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertModel } from '../../model/alert-model';
import { TypeAlert } from '../../interface/alert-interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // product: Product[];
  txtSearch: string = '';

  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private _router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
    ) {}

  ngOnInit() {
    this.spinner.show();
    this.getProducts()
  }

  public getProducts(): void {
    this.productService.getProducts()
      .subscribe(product => {
          this.products = product.data;
          this.spinner.hide();
      });    
  }

  onClickDeleteProduct(id: number) {
    const dialogRef = this.dialogService.openConfirmDialog('Confirm', `Are you sure delete product id = ${id} ?`);
    dialogRef.afterClosed().subscribe(result => {
      if(result==='true'){
        //Neu bam nut Yes Dialog
        this.alertService.clearAlertMessage();//xoa phan tu alert
        this.productService.deleteProductById(id)
          .subscribe(JsonResponse =>{ 
            this.handleSubcribeDeleteProduct(JsonResponse.message, JsonResponse.total, JsonResponse.id); 
          });  
      }
    }) 
  }

  onClickEditProduct(id: number) {
    this._router.navigate(['editproduct',id]);
  }

  private handleSubcribeDeleteProduct(message: string, total: number, id: number) {
    if (message !== '' && message === 'Product Delete Success' && total > 0) {
      //Xoa thanh cong
      const alertMessageDelete: AlertModel = new AlertModel(TypeAlert.Success, `Delete product id = ${id} success.`);
      this.alertService.addAlertMessage(alertMessageDelete);
    } else {
      //Xoa khong thanh cong
      const alertMessageDelete: AlertModel = new AlertModel(TypeAlert.Faild, `Delete product id = ${id} faild.`);
      this.alertService.addAlertMessage(alertMessageDelete);
    }
    this.getProducts();
  }


}
