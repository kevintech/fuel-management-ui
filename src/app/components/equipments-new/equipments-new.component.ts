import { Component, OnInit } from '@angular/core'
import { EquipmentService } from '../../services/equipment/equipment.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Equipment } from '../../models/equipment/equipment.model'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-equipments-new',
  templateUrl: './equipments-new.component.html',
  styleUrls: ['./equipments-new.component.css']
})
export class EquipmentsNewComponent implements OnInit {
  equipmentForm: FormGroup

  constructor(
    private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      year: ['', [Validators.required]],
      company: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  get f() {
    return this.equipmentForm.controls
  }

  onSubmit() {

    if (this.equipmentForm.invalid) {
      return
    }

    this.spinner.show()

    const equipmentData: Equipment = {
      code: this.f.code.value,
      plate: this.f.plate.value,
      brand: this.f.brand.value,
      model: this.f.model.value,
      description: this.f.description.value,
      serial: this.f.serial.value,
      year: this.f.year.value,
      company: this.f.company.value,
      status: this.f.status.value,
    }

    this.equipmentService.save(equipmentData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Equipo registrado con éxito')
        this.router.navigate(['settings/equipments'])
      })
      .catch(error => {
        this.spinner.show()
        this.showAlert('error', error)
      })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
