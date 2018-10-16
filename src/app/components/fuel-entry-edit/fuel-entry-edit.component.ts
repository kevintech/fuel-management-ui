import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model'
import { SupplyStation } from '../../models/supply-station/supply-station.model'
import { SupplyStationService } from '../../services/supply-station/supply-station.service'
import { TankMeasurement } from '../../models/fuel-entry/tank-measurement.model'
import { BombMeter } from '../../models/fuel-entry/bomb-meter.model'
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fuel-entry-edit',
  templateUrl: './fuel-entry-edit.component.html',
  styleUrls: ['./fuel-entry-edit.component.css']
})
export class FuelEntryEditComponent implements OnInit {
  fuelForm: FormGroup;
  error = false;
  submitted = false;
  id: string;
  fuelEntryData: FuelEntry;
  supplyStationItems: SupplyStation[];
  totalBombMeterOne: number;
  totalBombMeterTwo: number;
  totalBombMeterThree: number;
  public entry: Observable<FuelEntry>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fuelEntryService: FuelEntryService,
    private supplyStationService: SupplyStationService,
    private notifierService: NotifierService,
    private confirmationDialogService: ConfirmationDialogService,
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
      detail: [null],
      date: ['']
    });

    this.getSupplyStations();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadData();
    });
    
    (<FormGroup>this.fuelForm.controls.bombMeter).controls.initBombMeterOne.valueChanges.subscribe(() => this.updateTotalBombMeterOne());
    (<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterOne.valueChanges.subscribe(() => this.updateTotalBombMeterOne());
    (<FormGroup>this.fuelForm.controls.bombMeter).controls.initBombMeterTwo.valueChanges.subscribe(() => this.updateTotalBombMeterTwo());
    (<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterTwo.valueChanges.subscribe(() => this.updateTotalBombMeterTwo());
    (<FormGroup>this.fuelForm.controls.bombMeter).controls.initBombMeterThree.valueChanges.subscribe(() => this.updateTotalBombMeterThree());
    (<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterThree.valueChanges.subscribe(() => this.updateTotalBombMeterThree());
  }

  private updateTotalBombMeterOne() {
    if (!(<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterOne.value) return;
    this.totalBombMeterOne = (<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterOne.value - (<FormGroup>this.fuelForm.controls.bombMeter).controls.initBombMeterOne.value
  }

  private updateTotalBombMeterTwo() {
    if (!(<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterTwo.value) return;
    this.totalBombMeterTwo = (<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterTwo.value - (<FormGroup>this.fuelForm.controls.bombMeter).controls.initBombMeterTwo.value
  }

  private updateTotalBombMeterThree() {
    if (!(<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterThree.value) return;
    this.totalBombMeterThree = (<FormGroup>this.fuelForm.controls.bombMeter).controls.finalBombMeterThree.value - (<FormGroup>this.fuelForm.controls.bombMeter).controls.initBombMeterThree.value
  }

  getSupplyStations(): void {
    this.supplyStationService.getAll().subscribe(data => {
      this.supplyStationItems = data;
    });
  }

  private loadData(): void {
    this.entry = this.fuelEntryService.getOne(this.id);
    this.entry.subscribe((data: FuelEntry) => {
      this.fuelEntryData = data;
      const entryData = { ...data, supplyStation: data.supplyStation.id };
      this.fuelForm.setValue(entryData);
    });
  }

  onSubmit() {
    if (this.fuelForm.invalid) {
      this.submitted = true;
      this.error = true;
      return true;
    }

    this.spinner.show()
    const measureTanksData: TankMeasurement = {
      initTankFive: (<FormGroup>this.f.measureTanks).controls.initTankFive.value,
      initTankFiveGallons: (<FormGroup>this.f.measureTanks).controls.initTankFiveGallons.value,
      finalTankFive: (<FormGroup>this.f.measureTanks).controls.finalTankFive.value,
      finalTankFiveGallons: (<FormGroup>this.f.measureTanks).controls.finalTankFiveGallons.value,
      initTankTen: (<FormGroup>this.f.measureTanks).controls.initTankTen.value,
      initTankTenGallons: (<FormGroup>this.f.measureTanks).controls.initTankTenGallons.value,
      finalTankTen: (<FormGroup>this.f.measureTanks).controls.finalTankTen.value,
      finalTankTenGallons: (<FormGroup>this.f.measureTanks).controls.finalTankTenGallons.value,
    }

    const bombMeterData: BombMeter = {
      initBombMeterOne: (<FormGroup>this.f.bombMeter).controls.initBombMeterOne.value,
      finalBombMeterOne: (<FormGroup>this.f.bombMeter).controls.finalBombMeterOne.value,
      initBombMeterTwo: (<FormGroup>this.f.bombMeter).controls.initBombMeterTwo.value,
      finalBombMeterTwo: (<FormGroup>this.f.bombMeter).controls.finalBombMeterTwo.value,
      initBombMeterThree: (<FormGroup>this.f.bombMeter).controls.initBombMeterThree.value,
      finalBombMeterThree: (<FormGroup>this.f.bombMeter).controls.finalBombMeterThree.value,
    }

    const fuelEntryData: FuelEntry = {
      date: this.fuelEntryData.date,
      measureTanks: measureTanksData,
      bombMeter: bombMeterData,
      supplyStation: this.supplyStationSelected(),
      detail: this.fuelEntryData.detail
    }

    this.fuelEntryService.update(this.id, fuelEntryData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Estación de servicio actualizada con éxito');
      })
      .catch(error => {
        this.spinner.show();
        this.showAlert('error', error);
      })
  }

  onDelete() {
    this.confirmationDialogService.confirm('Confirmación', '¿Estas seguro que deseas eliminarlo?', 'Sí, eliminar')
      .then(confirmed => {
        if (confirmed) {
          this.spinner.show()
          this.supplyStationService.delete(this.id)
            .then(response => {
              this.spinner.hide()
              this.showAlert('success', 'Estación de servicio eliminada con éxito')
              this.router.navigate(['entries/fuel'])
            })
            .catch(error => {
              this.spinner.hide()
              this.showAlert('error', error)
            })
        }
      })
      .catch(error => {
        console.log('Error in dialog: ', error)
      })
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }

  get f() {
    return this.fuelForm.controls;
  }

  private supplyStationSelected() {
    let supplyStationId = this.f.supplyStation.value;
    return this.supplyStationItems.find(x => {
      return x.id == supplyStationId
    });
  }
}
