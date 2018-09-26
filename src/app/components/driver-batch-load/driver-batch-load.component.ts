import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as XLSX from 'xlsx';
import { Driver } from '../../models/driver/driver.model';
import { DriverFileHeaders } from './driver-file-headers';
import { DriverService } from '../../services/driver/driver.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-driver-batch-load',
  templateUrl: './driver-batch-load.component.html',
  styleUrls: ['./driver-batch-load.component.css']
})
export class DriverBatchLoadComponent implements OnInit {
  driverForm: FormGroup
  error = false;
  submitted = false;
  loaded = false;
  data: Array<Driver>;

  constructor(
    private driverService: DriverService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  get f() {
    return this.driverForm.controls
  }

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      fileXlsx: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.spinner.show();
    if (this.driverForm.invalid || !this.data) {
      this.submitted = true;
      this.error = true;
      return true;
    }

    Promise.all(this.driverService.deleteAll())
      .then(
        () => {
          console.log("lets save all...");
          return this.driverService.saveAll(this.data)
        },
        (e) => console.error(e)
      )
      .then(() => {
        this.showAlert('success', 'Pilotos cargados con éxito');
        this.router.navigate(['settings/drivers']);
      }, (error) => {
        console.error(error);
        this.showAlert('error', error);
      })
      .then(() => {
        this.spinner.hide();
      });
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.loaded = true;
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json<Driver>(ws, { raw: false, header: DriverFileHeaders });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
