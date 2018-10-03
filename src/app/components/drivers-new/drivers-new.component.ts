import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DriverService } from '../../services/driver/driver.service'
import { Driver } from '../../models/driver/driver.model'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-drivers-new',
  templateUrl: './drivers-new.component.html',
  styleUrls: ['./drivers-new.component.css']
})
export class DriversNewComponent implements OnInit {
  driverForm: FormGroup
  error = false;
  submitted = false;

  constructor(
    private driverService: DriverService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
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
  }

  get f() {
    return this.driverForm.controls
  }

  onSubmit() {
    if (this.driverForm.invalid) {
      this.submitted = true;
      this.error = true;
      return true;
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

    this.driverService.save(driverData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Piloto registrado con éxito')
        this.router.navigate(['settings/drivers'])
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
