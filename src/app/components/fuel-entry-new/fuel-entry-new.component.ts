import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'
import { TankMeasurement } from '../../models/fuel-entry/tank-measurement.model'
import { BombMeter } from '../../models/fuel-entry/bomb-meter.model';

@Component({
  selector: 'app-fuel-entry-new',
  templateUrl: './fuel-entry-new.component.html',
  styleUrls: ['./fuel-entry-new.component.css']
})
export class FuelEntryNewComponent implements OnInit {
  fuelForm: FormGroup
  error = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fuelEntryService: FuelEntryService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.fuelForm = this.formBuilder.group({
      initTankFive: ['', [Validators.required]],
      initTankFiveGallons: ['', [Validators.required]],
      initTankTen: ['', [Validators.required]],
      initTankTenGallons: ['', [Validators.required]],
      initBombMeterOne: ['', [Validators.required]],
      initBombMeterTwo: ['', [Validators.required]],
      initBombMeterThree: ['', [Validators.required]]
    })
  }

  get f() {
    return this.fuelForm.controls
  }

  onSubmit() {
    if (this.fuelForm.invalid) {
      this.submitted = true;
      this.error = true;
      return true;
    }

    this.spinner.show()

    const tankMeasureData: TankMeasurement = {
      initTankFive: this.f.initTankFive.value,
      initTankFiveGallons: this.f.initTankFiveGallons.value,
      finalTankFive: 0,
      finalTankFiveGallons: 0,
      initTankTen: this.f.initTankTen.value,
      initTankTenGallons: this.f.initTankTenGallons.value,
      finalTankTen: 0,
      finalTankTenGallons: 0
    }

    const bombMeterData: BombMeter = {
      initBombMeterOne: this.f.initBombMeterOne.value,
      finalBombMeterOne: 0,
      initBombMeterTwo: this.f.initBombMeterTwo.value,
      finalBombMeterTwo: 0,
      initBombMeterThree: this.f.initBombMeterThree.value,
      finalBombMeterThree: 0
    }

    const fuelEntryData: FuelEntry = {
      date: this.getCurrentDate(),
      measureTanks: tankMeasureData,
      bombMeter: bombMeterData
    }

    this.fuelEntryService.save(fuelEntryData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Estación de servicio iniciada con éxito')
        this.router.navigate(['entries/fuel'])
      })
      .catch(error => {
        this.spinner.show()
        this.showAlert('error', error)
      })
  }

  getCurrentDate(): string {
    const typeDate = new Date()
    let month: number = typeDate.getMonth() + 1
    let parseMonth: string = ''

    if (month < 10) {
      parseMonth = '0' + month
    }

    return typeDate.getFullYear() + '-' + parseMonth + '-' + typeDate.getDate()
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
