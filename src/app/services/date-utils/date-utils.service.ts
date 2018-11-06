import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }

  public getCurrentDate(): string {
    const typeDate = new Date()
    let parseMonth: string = this.parseDate(typeDate.getMonth() + 1);
    let parseDay: string = this.parseDate(typeDate.getDate());
    return typeDate.getFullYear() + '-' + parseMonth + '-' + parseDay
  }

  private parseDate(date) {
    if (date<10) return '0' + date;
    return date.toString();
  }
}
