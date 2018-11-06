import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { OilEntry } from '../../models/oil-entryl/oil-entry.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-oil-entry',
  templateUrl: './oil-entry.component.html',
  styleUrls: ['./oil-entry.component.css']
})
export class OilEntryComponent implements OnInit {
  entries: Observable<OilEntry[]>;

  constructor(
    private oilEntryService: OilEntryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.entries = this.oilEntryService.getByDate(this.getCurrentDate());
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
