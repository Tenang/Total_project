import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(private productservice:ProductService, private router:Router){

  }
  ngOnInit(): void {
   this.searchProducts()
  }


  searchProducts(){
    this.productservice.searchProducts(this.keywork,this.currentPage,this.pageSize)
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
    this.searchProducts(); 

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

  handleEditProduct(product: Product){
this.router.navigateByUrl(`/editProduct/${product.id}`)
    
  }
 /*  searchProduct(){

    this.currentPage=1;
    this.totalpages=0;
    this.productservice.searchProduct(this.keywork, this.currentPage,this.pageSize).subscribe({
      next : value => {
            this.products=value; 
      }
    })
  } */
}
