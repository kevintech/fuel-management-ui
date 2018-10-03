import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplyStation } from '../../models/supply-station/supply-station.model';
import { SupplyStationFileHeaders } from './supply-station-file-headers';
import { SupplyStationService } from '../../services/supply-station/supply-station.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelDataReaderService } from '../../services/excel-data-reader/excel-data-reader.service';

@Component({
  selector: 'app-supply-station-batch-load',
  templateUrl: './supply-station-batch-load.component.html',
  styleUrls: ['./supply-station-batch-load.component.css']
})
export class SupplyStationBatchLoadComponent implements OnInit {
  batchLoadForm: FormGroup;
  error = false;
  submitted = false;
  loaded = false;
  data: Array<SupplyStation>;

  constructor(
    private stationService: SupplyStationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
    private excelDataReader: ExcelDataReaderService,
  ) { }

  get f() {
    return this.batchLoadForm.controls;
  }

  ngOnInit() {
    this.batchLoadForm = this.formBuilder.group({
      fileXlsx: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.spinner.show();
    if (this.batchLoadForm.invalid || !this.data) {
      this.submitted = true;
      this.error = true;
      return true;
    }

    this.stationService.deleteAll()
      .then(
        () => {
          return this.stationService.saveAll(this.data);
        },
        (error) => this.showAlert('error', error)
      )
      .then(() => {
        this.showAlert('success', 'Pilotos cargados con éxito');
        this.router.navigate(['settings/stations']);
      }, (error) => this.showAlert('error', error))
      .then(() => this.spinner.hide());
  }

  onFileChange(evt: any) {
    this.excelDataReader.read<SupplyStation>(evt.target, SupplyStationFileHeaders, (data)=> {
      this.data = data;
      this.loaded = true;
    });
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }

}
