import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { map, catchError, tap } from 'rxjs/operators';
import { urlApiProduct, urlApiCategoryProduct, httpOptions } from '../util/url-api-services';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  product: Product[] = [];

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  public getProducts(): Observable<any> {
    return this.http.get(urlApiProduct.GetOrPost)
      .pipe(
        tap(_ => this.log('fetched Products'))
      );
    // return this.http.get(this.urlApiProducts + 'products').pipe(
    //   map(this.extractData));
  }

  public getCategoryProducts(): Observable<any> {
    return this.http.get(urlApiCategoryProduct.GetOrPost)
      .pipe(
        tap(_ => this.log('fetched Category Success'))
      )
  }

  public addProductService(DataJson: Product): Observable<any> {
    return this.http.post<Product>(urlApiProduct.GetOrPost, DataJson, httpOptions)
      .pipe(
        tap(_ => this.log('added success'))
      );
  }

  public deleteProductById(id: number): Observable<any> {

    const urlDeleteProduct = urlApiProduct.Action + id;
    console.log(urlDeleteProduct);
    return this.http.delete<Product>(urlDeleteProduct).pipe(
      tap(_ => this.log(`Delete hero id = ${id}`))
    );

  }

  public getProductByIdService(id: number): Observable<any> {
    const urlGetAProductById = urlApiProduct.Action + id;
    return this.http.get(urlGetAProductById)
      .pipe(
        tap(_ => this.log('fetched Success'))
      )
  }

  public updateProductById(id: number, dataProductJSON: Product): Observable<any> {
    const urlUpdateProductById = urlApiProduct.Action + id;
    return this.http.put(urlUpdateProductById, dataProductJSON, httpOptions)
      .pipe(
        tap(_ => this.log('update Success'))
      )
  }


  log(message: any): void {
    console.log(message);
  }



}
