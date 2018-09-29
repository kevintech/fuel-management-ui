import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'

@Component({
  selector: 'app-fuel-entry',
  templateUrl: './fuel-entry.component.html',
  styleUrls: ['./fuel-entry.component.css']
})
export class FuelEntryComponent implements OnInit {
  fuelEntryItems: Observable<FuelEntry[]>

  constructor(private fuelEntryService: FuelEntryService) { }

  ngOnInit() {
    this.fuelEntryItems = this.fuelEntryService.getAll()
  }
}
