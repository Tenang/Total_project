import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
   public host : string="http://localhost:3000"

  constructor( private http : HttpClient) { }

  public searchProducts(keywork : string="",page : number=1, size:number=6){

    return this.http.get(`${this.host}/products?name_like=${keywork}&_page=${page}&_limit=${size}`, {observe:'response'})
  }

  public CheckProduct(product : Product): Observable<Product>{

    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      { checked: !product.checked });
  }

  public  DeleteProduct(product : Product){

    return this.http.delete<any>(`${this.host}/products/${product.id}`);
}

  public saveProduct(product: Product): Observable<Product>{
  return this.http.post<Product>(`${this.host}/products`,product );  
 
}

  public getProductById(productId: number) : Observable<Product> {

  return this.http.get<Product>(`${this.host}/products/${productId}`)

}

  public updateProduct(product: Product): Observable<Product>   {
  return this.http.put<Product>(`${this.host}/products/${product.id}`,product)
}

 /*  public searchProduct(keywork : string, page:number, size:number): Observable<Array<Product>>{

    return this.http.get<Array<Product>>(`http://localhost:3000/products?name_like=${keywork}&_page=${page}&_limit=${size}`)
  } */
}

