import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';
import { OilEntry } from '../../models/oil-entryl/oil-entry.model';

@Component({
  selector: 'app-oil-entry',
  templateUrl: './oil-entry.component.html',
  styleUrls: ['./oil-entry.component.css']
})
export class OilEntryComponent implements OnInit {
  entries: Observable<OilEntry[]>;

  constructor(
    private oilEntryService: OilEntryService,
    private dateUtilsService: DateUtilsService
  ) { }

  ngOnInit() {
    const date = new Date(this.dateUtilsService.getCurrentDate()).getTime();
    this.entries = this.oilEntryService.getByDate(date);
  }
}
