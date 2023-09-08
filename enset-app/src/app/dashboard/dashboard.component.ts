import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public appstateService : AppStateService){

  }
  ngOnInit()  {
   
  }
  totalchechedProduct(){
    let chechedPro = this.appstateService.productState.products.filter((p:any)=>p.checked==true);
    return  chechedPro.length
        }

 
}
