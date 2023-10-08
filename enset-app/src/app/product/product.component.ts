import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { AppStateService } from '../services/app-state.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

   


  constructor(private productservice:ProductService, private router:Router, public appstateserv : AppStateService){

  }
  ngOnInit(): void {
   this.searchProducts()
  }


  searchProducts(){
   // this.appstateserv.productState.status="LOADING"
  /*  this.appstateserv.setProductState({
    status: "LOADING"
   }) */
    this.productservice.searchProducts(this.appstateserv.productState.keywork,this.appstateserv.productState.currentPage,this.appstateserv.productState.pageSize)
    .subscribe({
      next: (resp)=> {
        //this.appstateserv.productState.products=resp.body as Product[]
        let products = resp.body as Product[]
        let totalProducts : number = parseInt(resp.headers.get('x-total-count')!);
        
      //  this.appstateserv.productState.totalProduct=totalProducts;
        console.log(this.appstateserv.productState.totalProduct);
       // this.appstateserv.productState.totalpages
        let totalpages=
          Math.floor(totalProducts/this.appstateserv.productState.pageSize) 
        if(this.appstateserv.productState.totalpages%this.appstateserv.productState.pageSize!=0){
          //this.appstateserv.productState.totalpages+=1
          ++totalpages;
        }
this.appstateserv.setProductState({
  products:products,
  totalProducts:totalProducts,
  totalpages: totalpages,
  status: "LOADED"

})
      } ,
      error: err=> {
        this.appstateserv.setProductState({
          status : "ERROR",
          errorMessage : err,
        })
        
      }

    })
  }
  handleGotoPage(page : number){
    this.appstateserv.productState.currentPage=page;
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
         // this.appstateserv.productState.products=this.appstateserv.productState.products.filter((p:any)=>p.id!=product.id)
          this.searchProducts()
      }
    })
  }

  handleEditProduct(product: Product){
this.router.navigateByUrl(`/admin/editProduct/${product.id}`)
    
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
