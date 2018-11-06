import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-fuel-entry-report',
  templateUrl: './fuel-entry-report.component.html',
  styleUrls: ['./fuel-entry-report.component.css']
})
export class FuelEntryReportComponent implements OnInit {
  exportForm: FormGroup;
  error = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private fuelEntryService: FuelEntryService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.exportForm = this.formBuilder.group({
      date: ['', [Validators.required]]
    })
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

    this.spinner.show()

    let parseDate = new Date(this.f.date.value).getTime();
    this.fuelEntryService.getByDate(parseDate).pipe().subscribe(data => {

    }, error => {

    });
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll()
    this.notifierService.notify(type, message)
  }
}
