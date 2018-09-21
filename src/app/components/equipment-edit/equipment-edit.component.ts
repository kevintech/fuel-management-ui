import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { EquipmentService } from '../../services/equipment/equipment.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Equipment } from '../../models/equipment/equipment.model'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service'

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

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadData();
    })
  }

  get f() {
    return this.equipmentForm.controls
  }

  loadData(): void {
    this.equipment = this.equipmentService.getOne(this.id);
    this.equipment.subscribe(data => {
      this.equipmentForm.setValue({ ...data });
    });
  }

  onSubmit() {
    if (this.equipmentForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const equipmentData = {
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
