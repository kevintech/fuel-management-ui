import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { OilEntry } from '../../models/oil-entryl/oil-entry.model';

@Component({
  selector: 'app-oil-entry',
  templateUrl: './oil-entry.component.html',
  styleUrls: ['./oil-entry.component.css']
})
export class OilEntryComponent implements OnInit {
  public entries: Observable<OilEntry[]>;

  constructor(private oilEntryService: OilEntryService) { }

  ngOnInit() {
    this.entries = this.oilEntryService.getAll()
  }
}
