import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Driver } from '../../models/driver/driver.model';
import { DriverFileHeaders } from './driver-file-headers';
import { DriverService } from '../../services/driver/driver.service';
import { AlertService } from '../../services/alert/alert-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelDataReaderService } from '../../services/excel-data-reader/excel-data-reader.service';

@Component({
  selector: 'app-driver-batch-load',
  templateUrl: './driver-batch-load.component.html',
  styleUrls: ['./driver-batch-load.component.css']
})
export class DriverBatchLoadComponent implements OnInit {
  batchLoadForm: FormGroup
  error = false;
  submitted = false;
  loaded = false;
  data: Array<Driver>;

  constructor(
    private driverService: DriverService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private excelDataReader: ExcelDataReaderService,
  ) { }

  get f() {
    return this.batchLoadForm.controls
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

    this.driverService.deleteAll()
      .then(
        () => {
          return this.driverService.saveAll(this.data)
        },
        (error) => this.alertService.alert('error', error)
      )
      .then(() => {
        this.alertService.alert('success', 'Pilotos cargados con éxito');
        this.router.navigate(['settings/drivers']);
      }, (error) => this.alertService.alert('error', error))
      .then(() => this.spinner.hide());
  }

  onFileChange(evt: any) {
    this.excelDataReader.read<Driver>(evt.target, DriverFileHeaders, (data)=> {
      this.data = data;
      this.loaded = true;
    });
  }
}
