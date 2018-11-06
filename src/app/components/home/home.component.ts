import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';

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

  constructor(
    private equipmentService: EquipmentService,
    private oilEntryService: OilEntryService,
    private fuelEntryService: FuelEntryService
  ) { }

  ngOnInit() {
    this.loadFuelEntries();
    this.loadOilEntries();
    this.loadEquipments();
  }

  loadFuelEntries(): void {
    this.fuelEntryService.getByDate(this.getCurrentDate()).pipe().subscribe(data => {
      data.forEach(item => {
        this.fuelEntries += item.detail.length;
      });
    }, error  => {
      console.log('Load fuel entry error => ', error);
    });
  }

  loadOilEntries(): void {
    this.oilEntryService.getByDate(this.getCurrentDate()).pipe().subscribe(data => {
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

  getCurrentDate(): string {
    const typeDate = new Date()
    const month: number = typeDate.getMonth() + 1
    const day: number = typeDate.getDate()
    const parseMonth: string = month < 10 ? '0' + month : '' + month
    const parseDay: string = day < 10 ? '0' + day : '' + day

    return typeDate.getFullYear() + '-' + parseMonth + '-' + parseDay
  }
}
