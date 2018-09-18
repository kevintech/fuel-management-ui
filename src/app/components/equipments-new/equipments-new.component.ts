import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipment } from '../../models/equipment/equipment.model';

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
    const driverData : Equipment = {
      license: this.f.license.value,
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      birthdate: this.f.birthdate.value,
      phone: this.f.phone.value
    }

    this.equipmentService.save(driverData)
      .then(response => {
        this.router.navigate(['settings/equipments'])
      });
  }

}
