import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CategoryProduct } from '../model/category-product.model';
import { urlApiCategoryProduct, httpOptions } from '../util/url-api-services';

@Injectable({
  providedIn: 'root'
})

export class CategoryProductService {

  constructor(private http: HttpClient) { }

  public getCategoryProductService(): Observable<any> {
    return this.http.get(urlApiCategoryProduct.GetOrPost)
      .pipe(
        tap(_ => console.log('Get CategoryProduct Success'))
      )
  }
  public getCategoryProductByIdService(id: number): Observable<any> {
    const urlGetCategoryById = urlApiCategoryProduct.Action + id;
    return this.http.get(urlGetCategoryById)
      .pipe(
        tap(_ => this.log('fetched Success'))
      )
  }
  public addCategoryProductService(DataJson: CategoryProduct): Observable<any> {
    return this.http.post<CategoryProduct>(urlApiCategoryProduct.GetOrPost, DataJson, httpOptions)
      .pipe(
        tap(_ => this.log('added success'))
      );
  }
  private log(message: any): void {
    console.log(message);
  }
  public deleteCategoryProductByIdService(id: number): Observable<any> {

    const urlDeleteProduct = urlApiCategoryProduct.Action + id;
    console.log(urlDeleteProduct);
    return this.http.delete<CategoryProduct>(urlDeleteProduct).pipe(
      tap(_ => this.log(`Delete id = ${id}`))
    );

  }

  public updateCategoryProductByIdService(id: number, dataCategoryJSON: CategoryProduct): Observable<any> {
    const urlUpdateProductById = urlApiCategoryProduct.Action + id;
    return this.http.put(urlUpdateProductById, dataCategoryJSON, httpOptions)
      .pipe(
        tap(_ => this.log('update Success'))
      )
  }

}
