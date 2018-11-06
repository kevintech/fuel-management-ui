import { Component, OnInit } from '@angular/core';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private dateUtilsService: DateUtilsService
  ) { }

  ngOnInit() {
    const date = new Date(this.dateUtilsService.getCurrentDate()).getTime();
    this.entries = this.fuelEntryService.getByDate(date);
  }
}
