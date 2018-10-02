import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { SupplyStation } from '../../models/supply-station/supply-station.model'
import { SupplyStationService } from '../../services/supply-station/supply-station.service'
import { TankMeasurement } from '../../models/fuel-entry/tank-measurement.model'
import { BombMeter } from '../../models/fuel-entry/bomb-meter.model'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-fuel-entry-edit',
  templateUrl: './fuel-entry-edit.component.html',
  styleUrls: ['./fuel-entry-edit.component.css']
})
export class FuelEntryEditComponent implements OnInit {
  fuelForm: FormGroup
  error = false
  submitted = false
  id: string
  entry: Observable<FuelEntry>
  supplyStationItems: SupplyStation[]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fuelEntryService: FuelEntryService,
    private supplyStationService: SupplyStationService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.fuelForm = this.formBuilder.group({
      supplyStation: ['', [Validators.required]],
      measureTanks: this.formBuilder.group({
        initTankFive: ['', [Validators.required]],
        initTankFiveGallons: ['', [Validators.required]],
        finalTankFive: ['', [Validators.required]],
        finalTankFiveGallons: ['', [Validators.required]],
        initTankTen: ['', [Validators.required]],
        initTankTenGallons: ['', [Validators.required]],
        finalTankTen: ['', [Validators.required]],
        finalTankTenGallons: ['', [Validators.required]]
      }),
      bombMeter: this.formBuilder.group({
        initBombMeterOne: ['', [Validators.required]],
        finalBombMeterOne: ['', [Validators.required]],
        initBombMeterTwo: ['', [Validators.required]],
        finalBombMeterTwo: ['', [Validators.required]],
        initBombMeterThree: ['', [Validators.required]],
        finalBombMeterThree: ['', [Validators.required]]
      }),
      date: ['']
    })

    this.getSupplyStations()

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.loadData()
    })
  }

  getSupplyStations(): void {
    this.supplyStationService.getAll().subscribe(data => {
      this.supplyStationItems = data
    })
  }

  private loadData(): void {
    this.entry = this.fuelEntryService.getOne(this.id)
    this.entry.subscribe(data => {
      this.fuelForm.setValue({ ...data })
    })
  }

  get f() {
    return this.fuelForm.controls
  }
}
