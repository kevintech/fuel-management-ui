import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private notifierService: NotifierService) { }

  public alert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }
}
