import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  productId! : number;
  constructor( private activedRoute : ActivatedRoute, private productService : ProductService){
    
  }



  ngOnInit(): void {
   this.productId=this.activedRoute.snapshot.params['id'];
  this.productService.getProductById(this.productId)
  }


 

}
