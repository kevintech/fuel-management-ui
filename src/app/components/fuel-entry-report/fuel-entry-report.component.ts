import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { OilEntry } from 'src/app/models/oil-entryl/oil-entry.model';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert/alert-service.service';
import * as XLSX from 'xlsx';
import { FuelEntryReportRow } from './fuel-entry-report-row.model';
import { FuelEntryReportHeaders } from './fuel-entry-report-headers';

@Component({
  selector: 'app-fuel-entry-report',
  templateUrl: './fuel-entry-report.component.html',
  styleUrls: ['./fuel-entry-report.component.css']
})
export class FuelEntryReportComponent implements OnInit {
  exportForm: FormGroup;
  error = false;
  submitted = false;
  reportData: Array<FuelEntryReportRow>;
  spinnerState: number;

  constructor(
    private formBuilder: FormBuilder,
    private fuelEntryService: FuelEntryService,
    private oilEntryService: OilEntryService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.exportForm = this.formBuilder.group({
      date: ['', [Validators.required]]
    });
    
    this.reportData = new Array();
  }

  get f() {
    return this.exportForm.controls
  }

  onSubmit() {
    if (this.exportForm.invalid) {
      this.submitted = true;
      this.error = true;
      return true;
    }

    this.spinner.show();
    this.spinnerState = 0;
    let parseDate = new Date(this.f.date.value).getTime();
    this.fuelEntryService.getByDate(parseDate).subscribe(items => {
      items.forEach(item => {
        this.addFuelEntryRow(item);
      })

      this.downloadReport();
    });

    this.oilEntryService.getByDate(parseDate).subscribe(items => {
      items.forEach(item => {
        this.addOilEntryRow(item);
      })

      this.downloadReport();
    });
  }

  private downloadReport() {
    if (++this.spinnerState < 2) return;
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      FuelEntryReportHeaders
    ].concat(this.getReportData()));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    this.spinner.hide();
  }

  private getReportData() {
    let reportArrayData = Array();
    this.reportData.forEach(row => {
      reportArrayData.push([row.code || row.plate, row.diesel.day, row.diesel.night,
        row.gasoline, row.oil15W40, row.oilW30Cat, row.oil15W40Cat, row.oil20W50,
        row.oil85W140, row.oil80W90, row.oil30, row.atf, row.cooling, row.grease]);
    });

    return reportArrayData;
  }

  private addFuelEntryRow(fuelEntry: FuelEntry) {
    fuelEntry.detail.forEach(detail => {
      let row: FuelEntryReportRow = this.reportData.find(x => x.code === detail.code);
      if (!row) {
        row = this.initRow(detail.plate, detail.code);
        this.reportData.push(row);
      }

      row.gasoline = detail.amount;
    });
  }

  private addOilEntryRow(oilEntry: OilEntry) {
    let row: FuelEntryReportRow = this.reportData.find(x => x.code === oilEntry.code);
    if (!row) {
      row = this.initRow(oilEntry.plate, oilEntry.code);
      this.reportData.push(row);
    }

    row.oil15W40 = oilEntry.oil15W40;
    row.oilW30Cat = oilEntry.oilW30Cat;
    row.oil15W40Cat = oilEntry.oil15W40Cat;
    row.oil20W50 = oilEntry.oil20W50;
    row.oil85W140 = oilEntry.oil85W140;
    row.oil80W90 = oilEntry.oil80W90;
    row.oil30 = oilEntry.oil30;
    row.atf = oilEntry.atf;
    row.cooling = oilEntry.cooling;
    row.grease = oilEntry.grease;
  }

  private initRow(plate: string, code: string): FuelEntryReportRow {
    return {
      plate: plate,
      code: code,
      diesel: {
        day: 0,
        night: 0,
      },
      gasoline: 0,
      oil15W40: null,
      oilW30Cat: null,
      oil15W40Cat: null,
      oil20W50: null,
      oil85W140: null,
      oil80W90: null,
      oil30: null,
      atf: null,
      cooling: null,
      grease: null,
    };
  }
}
