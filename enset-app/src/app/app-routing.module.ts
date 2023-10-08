import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [

  {path : "login", component : LoginComponent },
  {
    path :"admin", component : AdminTemplateComponent, children :[
      {path : "newProduct", component : NewProductComponent },
      {path : "products", component : ProductComponent },
      {path : "editProduct/:id", component : EditProductComponent },
      {path : "home", component : HomeComponent },
     ]
  },
  
  
  {path : "", redirectTo:"login", pathMatch:'full'}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
