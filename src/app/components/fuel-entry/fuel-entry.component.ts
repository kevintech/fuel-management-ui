import { Component, OnInit } from '@angular/core'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { NgxSpinnerService } from 'ngx-spinner'
import { parse } from 'cfb/types';

@Component({
  selector: 'app-fuel-entry',
  templateUrl: './fuel-entry.component.html',
  styleUrls: ['./fuel-entry.component.css']
})
export class FuelEntryComponent implements OnInit {
  fuelEntryItems: FuelEntry[]

  constructor(
    private fuelEntryService: FuelEntryService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()
    this.getFuelEntryItems()
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
