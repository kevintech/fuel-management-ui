import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateUtilsService {

  constructor() { }

  public getCurrentDate(): string {
    const typeDate = new Date()
    const month: number = typeDate.getMonth() + 1
    const day: number = typeDate.getDate()
    const parseMonth: string = month < 10 ? '0' + month : '' + month
    const parseDay: string = day < 10 ? '0' + day : '' + day

    return typeDate.getFullYear() + '-' + parseMonth + '-' + parseDay
  }
}
