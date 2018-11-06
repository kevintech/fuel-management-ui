import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fuelEntries: number = 0;
  oilEntries: number = 0;
  equipments: number = 0;
  activeEquipments: number = 0;
  inactiveEquipments: number = 0;
  timestamp: number = new Date(this.dateUtilsService.getCurrentDate()).getTime();

  constructor(
    private equipmentService: EquipmentService,
    private oilEntryService: OilEntryService,
    private fuelEntryService: FuelEntryService,
    private dateUtilsService: DateUtilsService
  ) { }

  ngOnInit() {
    this.loadFuelEntries();
    this.loadOilEntries();
    this.loadEquipments();
  }

  loadFuelEntries(): void {
    this.fuelEntryService.getByDate(this.timestamp).pipe().subscribe(data => {
      data.forEach(item => {
        this.fuelEntries += item.detail.length;
      });
    }, error  => {
      console.log('Load fuel entry error => ', error);
    });
  }

  loadOilEntries(): void {
    this.oilEntryService.getByDate(this.timestamp).pipe().subscribe(data => {
      this.oilEntries = data.length;
    }, error => {
      console.log('Load oil entry error => ', error);
    });
  }

  loadEquipments(): void {
    this.equipmentService.getAll().pipe().subscribe(data => {
      this.equipments = data.length;
      this.activeEquipments = data.filter(x => x.status == "Activo").length;
      this.inactiveEquipments = data.filter(x => x.status == "Inactivo").length;
    }, error => {
      console.log('Load equipments error => ', error);
    });
  }
}
