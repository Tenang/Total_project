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
  totalpages:number=0;
  pageSize: number=3;
  currentPage:number=1

  constructor(private productservice:ProductService){

  }
  ngOnInit(): void {
   this.getProducts()
  }


  getProducts(){
    this.productservice.getProducts(this.currentPage,this.pageSize)
    .subscribe({
      next: (resp)=> {
        this.products=resp.body as Product[]
        let totalProducts : number = parseInt(resp.headers.get('x-total-count')!);
        this.totalpages=Math.floor(totalProducts/this.pageSize) 
        if(this.totalpages%this.pageSize!=0){
          this.totalpages+=1
        }

      } ,
      error: err=> {
        console.log(err);
        
      }

    })
  }
  handleGotoPage(page : number){
    this.currentPage=page;
    this.getProducts(); 

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
