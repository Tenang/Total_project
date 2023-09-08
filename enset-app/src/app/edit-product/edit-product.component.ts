import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  

  productformGroup! : FormGroup
  productId! : number;
  constructor( private activedRoute : ActivatedRoute, private productService : ProductService, private fb:FormBuilder){
    
  }



  ngOnInit(): void {
   this.productId=this.activedRoute.snapshot.params['id'];
   this.productService.getProductById(this.productId).subscribe({
      next : (product)=>{

      this.productformGroup=this.fb.group({
        id : this.fb.control(product.id),
        names : this.fb.control(product.name),
        price : this.fb.control(product.price,[Validators.min(100)]),
        checked : this.fb.control(product.checked),
      })
    },
    error: err=> {
      console.log(err)
    }
  })
  }

  updateProduct(){

    let product: Product=this.productformGroup.value;

    this.productService.updateProduct(product).subscribe({

      next : data => {
        alert(JSON.stringify(data))
      }

    })
  }


 

}
