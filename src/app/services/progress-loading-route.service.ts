import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressLoadingRouteService {
  isShowProgressBar: boolean = false;
  constructor() { }
  public show(): void {
    this.isShowProgressBar = true;
  }
  public hide(): void {
    this.isShowProgressBar = false;
  }
}
