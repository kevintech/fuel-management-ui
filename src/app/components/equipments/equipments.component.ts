import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EquipmentService } from '../../services/equipment/equipment.service'
import { Equipment } from '../../models/equipment/equipment.model'

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})

export class EquipmentsComponent implements OnInit {
  public equipmentItems: Observable<Equipment[]>

  constructor(
    private equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    this.equipmentItems = this.equipmentService.getAll()
  }
}
