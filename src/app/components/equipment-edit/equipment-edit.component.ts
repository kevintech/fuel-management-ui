import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Equipment } from '../../models/equipment/equipment.model';
import { AlertService } from '../../services/alert/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-equipments-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {
  equipmentForm: FormGroup
  id: String
  equipment: Observable<Equipment>
  error = false
  submitted = false

  constructor(
    private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.equipmentForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      code: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      year: ['', [Validators.required]],
      model: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      type: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      registrationCert: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      purchaseValue: ['', [Validators.required]],
      receptionDate: ['', [Validators.required]],
      declarationNumber: ['', [Validators.required]],
      bl: ['', [Validators.required]],
      freight: ['', [Validators.required]],
      protectionDevice: ['', [Validators.required]],
      protectionDeviceDateExpiration: ['', [Validators.required]],
      company: ['', [Validators.required]],
      status: ['', [Validators.required]],
      engineBrand: ['', [Validators.required]],
      engineModel: ['', [Validators.required]],
      engineSerial: ['', [Validators.required]],
      insurancePolicy: ['', [Validators.required]],
      insuranceExpirationDate: ['', [Validators.required]],
      importationDate: ['', [Validators.required]],
      importationVat: ['', [Validators.required]],
      importationDai: ['', [Validators.required]]
    })

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.loadData()
    })
  }

  get f() {
    return this.equipmentForm.controls
  }

  loadData(): void {
    this.equipment = this.equipmentService.getOne(this.id)
    this.equipment.subscribe(data => {
      this.equipmentForm.setValue({ ...data })
    })
  }

  onSubmit() {
    if (this.equipmentForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const equipmentData: Equipment = {
      description: this.f.description.value,
      code: this.f.code.value,
      brand: this.f.brand.value,
      year: this.f.year.value,
      model: this.f.model.value,
      serial: this.f.serial.value,
      type: this.f.type.value,
      plate: this.f.plate.value,
      registrationCert: this.f.registrationCert.value,
      idCard: this.f.idCard.value,
      purchaseValue: this.f.purchaseValue.value,
      receptionDate: this.f.receptionDate.value,
      declarationNumber: this.f.declarationNumber.value,
      bl: this.f.bl.value,
      freight: this.f.freight.value,
      protectionDevice: this.f.protectionDevice.value,
      protectionDeviceDateExpiration: this.f.protectionDeviceDateExpiration.value,
      company: this.f.company.value,
      status: this.f.status.value,
      engineBrand: this.f.engineBrand.value,
      engineModel: this.f.engineModel.value,
      engineSerial: this.f.engineSerial.value,
      insurancePolicy: this.f.insurancePolicy.value,
      insuranceExpirationDate: this.f.insuranceExpirationDate.value,
      importationDate: this.f.importationDate.value,
      importationVat: this.f.importationVat.value,
      importationDai: this.f.importationDai.value
    }

    this.equipmentService.update(this.id, equipmentData)
      .then(response => {
        this.spinner.hide()
        this.alertService.alert('success', 'Equipo actualizado con éxito')
        this.router.navigate(['settings/equipments'])
      })
      .catch(error => {
        this.spinner.hide()
        this.alertService.alert('error', error)
      })
  }

  onDelete() {
    this.confirmationDialogService.confirm('Confirmación', '¿Estás seguro que deseas eliminarlo?', 'Sí, eliminar')
      .then(confirmed => {
        if (confirmed) {
          this.spinner.show()
          this.equipmentService.delete(this.id)
            .then(response => {
              this.spinner.hide()
              this.alertService.alert('success', 'Eliminado correctamente')
              this.router.navigate(['settings/equipments'])
            })
            .catch(error => {
              this.spinner.hide()
              this.alertService.alert('error', error)
            })
        }
      })
      .catch(error => {
        console.log('Error in dialog: ', error)
      })
  }
}
