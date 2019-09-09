import { Injectable } from '@angular/core';
import { AlertModel } from '../model/alert-model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertMessage: AlertModel[] = [];

  constructor() { }

  public addAlertMessage(alertModel: AlertModel): void {
    this.alertMessage.push(alertModel);
    window.setTimeout(() => {
      this.clearAlertMessage();
    }, 4000)
  }

  public clearAlertMessage(): void {
    this.alertMessage = []; 
  }


}
