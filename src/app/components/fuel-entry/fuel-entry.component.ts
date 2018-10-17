import { Component, OnInit } from '@angular/core'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { NgxSpinnerService } from 'ngx-spinner'
import { parse } from 'cfb/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fuel-entry',
  templateUrl: './fuel-entry.component.html',
  styleUrls: ['./fuel-entry.component.css']
})
export class FuelEntryComponent implements OnInit {
  fuelEntryItems: FuelEntry[]
  data: Observable<FuelEntry[]>

  constructor(
    private fuelEntryService: FuelEntryService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()
    this.getFuelEntryItems()
    // this.getByDate('2018-10-16')
  }

  getByDate(date: string): void {
    let parseDate = new Date(date).getTime();
    this.fuelEntryService.getByDate(parseDate).onSnapshot({ includeMetadataChanges: true }, snapshot => {
      snapshot.docChanges().forEach(item => {
        console.log(item.doc.data())
      })
    })
  }

  getFuelEntryItems(): void {
    this.fuelEntryService.getAll()
      .subscribe(
        data => {
          this.fuelEntryItems = data.filter(item => item.date === this.getCurrentDate())
          this.spinner.hide()
        }, error => {
          console.log(error)
          this.spinner.hide()
        })
  }

  getCurrentDate(): string {
    const typeDate = new Date()
    let month: number = typeDate.getMonth() + 1
    let parseMonth: string = ''
    
    if (month < 10) {
      parseMonth = '0' + month
    } else {
      parseMonth = '' + month
    }

    return typeDate.getFullYear() + '-' + parseMonth + '-' + typeDate.getDate()
  }
}
