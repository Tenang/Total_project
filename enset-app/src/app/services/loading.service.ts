import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
// les subject sont des observables
  public isLoading$= new Subject<boolean>();

  constructor() { }

  showLoadingSpinner():void{
    this.isLoading$.next(true);

  }

  hideLoadingSpinner():void{
this.isLoading$.next(false);
  }
}
