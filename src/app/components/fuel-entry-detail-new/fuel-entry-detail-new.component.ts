import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FuelEntryDetail } from '../../models/fuel-entry/fuel-entry-detail.model';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model';
import { Department } from '../../config/department.enum';
import { Observable, Subscription } from 'rxjs';
import { DriverService } from '../../services/driver/driver.service';
import { Driver } from '../../models/driver/driver.model';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { Equipment } from 'src/app/models/equipment/equipment.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-fuel-entry-detail-new',
  templateUrl: './fuel-entry-detail-new.component.html',
  styleUrls: ['./fuel-entry-detail-new.component.css']
})
export class FuelEntryDetailNewComponent implements OnInit {
  form: FormGroup;
  entryData: FuelEntry;
  error = false;
  submitted = false;
  departmentType = Department;
  equipmentItems: Equipment[];
  entrySubscription : Subscription;
  public driverItems: Driver[];
  @Input() entry: Observable<FuelEntry>;
  @Input() id;

  constructor(
    private service: FuelEntryService,
    private driverService: DriverService,
    private equipmentService: EquipmentService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      kilometers: ['', [Validators.required]],
      plate: ['', []],
      code: ['', [Validators.required]],
      department: ['0', [Validators.required]],
      amount: ['', [Validators.required]],
      driver: ['0', []],
    });

    this.entrySubscription = this.entry.subscribe(data => this.entryData = data);
    this.loadDrivers();
    this.loadEquipments();
    this.formControlValueChanged();
  }

  ngOnDestroy() {
    this.entrySubscription.unsubscribe();
  }

  get f() {
    return this.form.controls;
  }

  get departments() {
    return Object.keys(Department);
  }

  private loadDrivers() {
    this.driverService.getAll().subscribe(data => {
      this.driverItems = data;
    });
  }

  private loadEquipments() {
    this.equipmentService.getAll().subscribe(data => {
      this.equipmentItems = data;
    });
  }

  private formControlValueChanged() {
    const plateControl = this.form.get('plate');
    const codeControl = this.form.get('code');
    plateControl.valueChanges.subscribe((value: string) => {
      if (value && value.length > 0) {
        codeControl.clearValidators();
      } else {
        codeControl.setValidators([Validators.required]);
      }
      codeControl.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.submitted = true;
      this.error = true;
      return true;
    }

    this.spinner.show();

    const data: FuelEntryDetail = {
      kilometers: this.f.kilometers.value,
      plate: this.f.plate.value || '',
      code: this.f.code.value || '',
      department: this.f.department.value,
      amount: this.f.amount.value,
      driver: this.driverSelected() || null,
      signedBy: ''
    };

    this.service.addDetail(this.entryData, data, this.id)
      .then(response => {
        this.spinner.hide();
        this.alertService.alert('success', 'Detalle agregado con éxito');
      })
      .catch(error => {
        this.spinner.show();
        this.alertService.alert('error', error);
      });
  }

  searchEquipmentByPlate = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.equipmentItems.filter(x => x.plate.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(x => x.plate))
    )

  searchEquipmentByCode = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.equipmentItems.filter(x => x.code.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10).map(x => x.code))
    )

  private driverSelected() {
    const driverId = this.f.driver.value;
    return this.driverItems.find(x => {
      return x.id === driverId;
    });
  }
}
