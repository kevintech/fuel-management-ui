import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { OilEntry } from '../../models/oil-entryl/oil-entry.model';
import { AlertService } from '../../services/alert/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Equipment } from '../../models/equipment/equipment.model';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { DateUtilsService } from '../../services/date-utils/date-utils.service';

@Component({
  selector: 'app-oil-entry-new',
  templateUrl: './oil-entry-new.component.html',
  styleUrls: ['./oil-entry-new.component.css']
})
export class OilEntryNewComponent implements OnInit {
  oilEntryForm: FormGroup
  error = false
  submitted = false
  equipmentItems: Equipment[];

  constructor(
    private oilEntryService: OilEntryService,
    private equipmentService: EquipmentService,
    private dateUtilsService: DateUtilsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.oilEntryForm = this.formBuilder.group({
      plate: ['', [Validators.required]],
      code: ['', [Validators.required]],
      kilometers: ['', [Validators.required]],
      oil15W40: ['', []],
      oilW30Cat: ['', []],
      oil15W40Cat: ['', []],
      oil20W50: ['', []],
      oil85W140: ['', []],
      oil80W90: ['', []],
      oil30: ['', []],
      atf: ['', []],
      cooling: ['', []],
      grease: ['', []]
    });

    this.loadEquipments();
  }

  private loadEquipments() {
    this.equipmentService.getAll().subscribe(data => {
      this.equipmentItems = data;
    });
  }

  get f() {
    return this.oilEntryForm.controls
  }

  onSubmit() {
    if (this.oilEntryForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const oilEntryData: OilEntry = {
      plate: this.f.plate.value,
      code: this.f.code.value,
      kilometers: this.f.kilometers.value,
      oil15W40: this.f.oil15W40.value,
      oilW30Cat: this.f.oilW30Cat.value,
      oil15W40Cat: this.f.oil15W40Cat.value,
      oil20W50: this.f.oil20W50.value,
      oil85W140: this.f.oil85W140.value,
      oil80W90: this.f.oil80W90.value,
      oil30: this.f.oil30.value,
      atf: this.f.atf.value,
      cooling: this.f.cooling.value,
      grease: this.f.grease.value,
      timestamp: new Date(this.dateUtilsService.getCurrentDate()).getTime(),
      date: this.dateUtilsService.getCurrentDate(),
    }

    this.oilEntryService.save(oilEntryData)
      .then(response => {
        this.spinner.hide()
        this.alertService.alert('success', 'Despacho de lubricante registrado con éxito')
        this.router.navigate(['entries/oil'])
      })
      .catch(error => {
        this.spinner.hide()
        this.alertService.alert('error', error)
      })
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
}
