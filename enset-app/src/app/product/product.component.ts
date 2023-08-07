import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

   
  public products : Array<Product> =[];
  public keywork : string="";

  constructor(private productservice:ProductService){

  }
  ngOnInit(): void {
   this.getProducts()
  }


  getProducts(){
    this.productservice.getProducts(1,3)
    .subscribe({
      next: data=> this.products=data,
      error: err=> {
        console.log(err);
        
      }

    })
  }
 
  

  handleCheckProduct(product : Product){
    this.productservice.CheckProduct(product).subscribe({
      next: UpdatedProduct=> {
        product.checked=!product.checked
      }
    })
  }

  handleDeleteProduct(product : Product){
     if(confirm("Etes vous sure de ce que vous etes sur le point de faire?"))
    this.productservice.DeleteProduct(product).subscribe({
      next:value=> {
          this.products=this.products.filter(p=>p.id!=product.id)
      }
    })
  }

  searchProduct(){

    this.productservice.searchProduct(this.keywork).subscribe({
      next : value => {
            this.products=value;
      }
    })
  }
}
