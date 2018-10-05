import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-fuel-entry-detail]',
  templateUrl: './fuel-entry-detail.component.html',
  styleUrls: ['./fuel-entry-detail.component.css']
})
export class FuelEntryDetailComponent implements OnInit {

  @Input() index;
  @Input() detail;

  constructor() { }

  ngOnInit() {
  }

}
