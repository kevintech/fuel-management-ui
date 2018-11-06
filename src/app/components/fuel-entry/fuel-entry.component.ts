import { Component, OnInit } from '@angular/core'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { NgxSpinnerService } from 'ngx-spinner'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fuel-entry',
  templateUrl: './fuel-entry.component.html',
  styleUrls: ['./fuel-entry.component.css']
})
export class FuelEntryComponent implements OnInit {
  entries: Observable<FuelEntry[]>

  constructor(
    private fuelEntryService: FuelEntryService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.entries = this.fuelEntryService.getByDate(this.getCurrentDate());
  }

  getCurrentDate(): string {
    const typeDate = new Date()
    const month: number = typeDate.getMonth() + 1
    const day: number = typeDate.getDate()
    const parseMonth: string = month < 10 ? '0' + month : '' + month
    const parseDay: string = day < 10 ? '0' + day : '' + day

    return typeDate.getFullYear() + '-' + parseMonth + '-' + parseDay
  }
}
