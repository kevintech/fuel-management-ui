import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FuelEntryDetail } from '../../models/fuel-entry/fuel-entry-detail.model';
import { FuelEntryService } from '../../services/fuel-entry/fuel-entry.service';
import { FuelEntry } from '../../models/fuel-entry/fuel-entry.model';
import { Observable } from 'rxjs';

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
  @Input() entry: Observable<FuelEntry>;
  @Input() id;

  constructor(
    private service: FuelEntryService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      kilometers: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      department: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      driver: ['', [Validators.required]],
    });

    this.entry.subscribe(data => this.entryData = data);
  }

  get f() {
    return this.form.controls;
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
      plate: this.f.plate.value,
      department: this.f.department.value,
      amount: this.f.amount.value,
      driver: this.f.driver.value,
      signedBy: ''
    };

    this.service.addDetail(this.entryData, data, this.id)
      .then(response => {
        this.spinner.hide();
        this.showAlert('success', 'Detalle agregado con éxito');
      })
      .catch(error => {
        this.spinner.show();
        this.showAlert('error', error);
      });
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }

}
