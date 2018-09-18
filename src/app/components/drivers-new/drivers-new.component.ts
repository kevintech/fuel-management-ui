import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DriverService } from '../../services/driver/driver.service';
import { Driver } from '../../models/driver/driver.model'

@Component({
  selector: 'app-drivers-new',
  templateUrl: './drivers-new.component.html',
  styleUrls: ['./drivers-new.component.css']
})
export class DriversNewComponent implements OnInit {
  private driverForm: FormGroup
  
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
      phone: ['', [Validators.required]]
    })
  }

  get f() {
    return this.driverForm.controls
  }

  onSubmit() {
    const driverData : Driver = {
      id: 1,
      license: this.f.license.value,
      name: this.f.name.value,
      lastname: this.f.lastname.value,
      birthdate: this.f.birthdate.value,
      phone: this.f.phone.value
    }

    this.driverService.save(driverData)
      .then(response => {
        this.router.navigate(['settings/drivers'])
      });
  }

}
