import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {


  public productState: any={
     products : [],
     keywork :"",
     totalpages:0,
     pageSize:3,
     currentPage:1,
     totalProduct:0
  }
  constructor() { }
}
