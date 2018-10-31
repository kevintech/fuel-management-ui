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
  public entries: Observable<OilEntry[]>;
  oilEntryItems: OilEntry[]
  data: Observable<OilEntry[]>

  constructor(private oilEntryService: OilEntryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.oilEntryService.getAll()
    .subscribe(
      data => {
        this.oilEntryItems = data.filter(item => item.date === this.getCurrentDate())
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
