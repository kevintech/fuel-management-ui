import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DriverService } from '../../services/driver/driver.service'
import { Driver } from '../../models/driver/driver.model'

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
    private router: Router) { }

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

    const driverData : Driver = {
      license: this.f.license.value,
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      birthdate: this.f.birthdate.value,
      phone: this.f.phone.value,
      status: this.f.status.value
    }

    this.driverService.save(driverData)
      .then(() => {
        this.router.navigate(['settings/drivers'])
      })
  }
}
