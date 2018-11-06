import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Driver } from '../../models/driver/driver.model';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../../services/driver/driver.service';
import { AlertService } from '../../services/alert/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-drivers-edit',
  templateUrl: './drivers-edit.component.html',
  styleUrls: ['./drivers-edit.component.css']
})
export class DriversEditComponent implements OnInit {
  driverForm: FormGroup
  error = false
  submitted = false
  id: string
  driver: Observable<Driver>

  constructor(
    private driverService: DriverService,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      license: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      phone: ['', []],
      status: ['', [Validators.required]]
    })

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.loadData()
    })
  }

  get f() {
    return this.driverForm.controls
  }

  private loadData() {
    this.driver = this.driverService.get(this.id)
    this.driver.subscribe(data => {
      this.driverForm.setValue({ ...data })
    })
  }

  onSubmit() {
    if (this.driverForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const driverData: Driver = {
      license: this.f.license.value,
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      birthdate: this.f.birthdate.value,
      phone: this.f.phone.value,
      status: this.f.status.value
    }

    this.driverService.update(this.id, driverData)
      .then(() => {
        this.spinner.hide()
        this.alertService.alert('success', 'Piloto actualizado con éxito')
        this.router.navigate(['settings/drivers'])
      })
      .catch(error => {
        this.spinner.hide()
        this.alertService.alert('error', error)
      })
  }

  onDelete() {
    this.confirmationDialogService.confirm('Confirmación', '¿Estas seguro que deseas eliminarlo?', 'Sí, eliminar')
      .then(confirmed => {
        if (confirmed) {
          this.spinner.show()
          this.driverService.delete(this.id)
            .then(response => {
              this.spinner.hide()
              this.alertService.alert('success', 'Piloto eliminado con éxito')
              this.router.navigate(['settings/drivers'])
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
