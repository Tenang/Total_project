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
     totalProduct:0,
    //  status:"LOADING",
     status:"",
     errotMessage:""
  }

  public authState: any={
      isAuthenticated : false,
      username: undefined,
      roles : undefined,
      token: undefined
  }
  constructor() { }
   
  public setProductState(state : any): void{
    this.productState =  {...this.productState, ...state}
  }

  public setAuthState(state : any):void{

    this.authState={...this.authState, ...state}
  }
}
