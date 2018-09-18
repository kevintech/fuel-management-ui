import { Component, OnInit } from '@angular/core'
import { EquipmentService } from '../../services/equipment/equipment.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Equipment } from '../../models/equipment/equipment.model'

@Component({
  selector: 'app-equipments-new',
  templateUrl: './equipments-new.component.html',
  styleUrls: ['./equipments-new.component.css']
})
export class EquipmentsNewComponent implements OnInit {
  private equipmentForm: FormGroup

  constructor(
    private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      license: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  get f() {
    return this.equipmentForm.controls
  }

  onSubmit() {
    const driverData: Equipment = {
      code: this.f.license.value,
      plate: this.f.license.value,
      description: this.f.name.value,
      brand: this.f.lastname.value,
      year: this.f.birthdate.value,
      model: this.f.phone.value,
      serial: this.f.phone.value,
      state: true
    }

    this.equipmentService.save(driverData)
      .then(response => {
        this.router.navigate(['settings/equipments'])
      })
  }

}
