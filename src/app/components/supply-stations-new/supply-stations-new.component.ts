import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SupplyStationService } from '../../services/supply-station/supply-station.service'
import { SupplyStation } from '../../models/supply-station/supply-station.model'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-supply-stations-new',
  templateUrl: './supply-stations-new.component.html',
  styleUrls: ['./supply-stations-new.component.css']
})
export class SupplyStationsNewComponent implements OnInit {
  private stationForm: FormGroup
  private error = false
  private submitted = false

  constructor(
    private stationService: SupplyStationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.stationForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', []],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  get f() {
    return this.stationForm.controls
  }

  onSubmit() {
    if (this.stationForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const stationData: SupplyStation = {
      code: this.f.code.value,
      description: this.f.description.value,
      address: this.f.address.value,
      phone: this.f.phone.value,
      status: this.f.status.value
    }

    this.stationService.save(stationData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Estación de servicio registrada con éxito')
        this.router.navigate(['settings/stations'])
      })
      .catch(error => {
        this.spinner.hide()
        this.showAlert('error', error)
      })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
