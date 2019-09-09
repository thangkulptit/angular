import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryProduct } from '../../model/category-product.model';
import { CategoryProductService } from '../../services/category-product.service';
import { ProgressLoadingRouteService } from '../../services/progress-loading-route.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AlertService } from '../../services/alert.service';
import { DialogService } from '../../services/dialog.service';
import { AlertModel } from '../../model/alert-model';
import { TypeAlert } from '../../interface/alert-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})


export class CategoryProductComponent implements OnInit, AfterViewInit {

  //protected dataResponseCategory: CategoryProduct[] = [];
  protected displayedColumns = ['id','name','actions'];
  protected dataSource = new MatTableDataSource<CategoryProduct>();

  @ViewChild(MatSort, {static : false}) sort: MatSort;
  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;

  constructor(
    private categoryProductService: CategoryProductService,
    private progressLoading: ProgressLoadingRouteService,
    private _router: Router,
    private dialogService: DialogService,
    private alertService: AlertService,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.progressLoading.show();
    this.getAllCategoryProduct();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
 

  public getAllCategoryProduct(): void {
    this.categoryProductService.getCategoryProductService()
      .subscribe(category => {
        this.dataSource.data = category.data; //lay data source
          this.progressLoading.hide();
      });    
  }
  filterByName(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  onClickEditButton(id: number) {
    this._router.navigate(['editcategory', id]); //
  }
  onClickDeleteButton(id: number) {
    const dialogRef = this.dialogService.openConfirmDialog('Confirm', `Are you sure delete category id = ${id}?`);
    dialogRef.afterClosed().subscribe(result => {
      if(result==='true'){
        //Neu bam nut Yes Dialog
        this.alertService.clearAlertMessage();//xoa phan tu alert
        this.categoryProductService.deleteCategoryProductByIdService(id)
          .subscribe(JsonResponse =>{ 
            this.handleSubcribeDeleteCategory(JsonResponse.message, JsonResponse.total, JsonResponse.id); 
          });  
      }
    }) 
  }
  private handleSubcribeDeleteCategory(message: string, total: number, id: string){
    if (message !== '' && message === 'Category Delete Success' && total > 0) {
      //Xoa thanh cong
      // const alertMessageDelete: AlertModel = new AlertModel(TypeAlert.Success, `Delete category id = ${id} success.`);
      // this.alertService.addAlertMessage(alertMessageDelete);
      this.toastrService.success(`Delete category id = ${id} success.`, 'Success!')
    } else {
      //Xoa khong thanh cong
      // const alertMessageDelete: AlertModel = new AlertModel(TypeAlert.Faild, `Delete category id = ${id} faild.`);
      // this.alertService.addAlertMessage(alertMessageDelete);
      this.toastrService.error(`Delete category id = ${id} faild.`, 'Faild!')
    }
    this.getAllCategoryProduct();
  }
  onClickAddButton() {
    this._router.navigate(['addcategory']);
  }

}

