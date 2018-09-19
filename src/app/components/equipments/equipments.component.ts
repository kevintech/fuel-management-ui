import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EquipmentService } from '../../services/equipment/equipment.service'
import { Equipment } from '../../models/equipment/equipment.model'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})

export class EquipmentsComponent implements OnInit {
  public equipmentItems: Observable<Equipment[]>

  constructor(
    private equipmentService: EquipmentService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData(): void {
      this.equipmentItems = this.equipmentService.getAll()
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
