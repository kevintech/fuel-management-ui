import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OilEntryService } from '../../services/oil-entry/oil-service.service';
import { OilEntry } from '../../models/oil-entryl/oil-entry.model';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-oil-entry-edit',
  templateUrl: './oil-entry-edit.component.html',
  styleUrls: ['./oil-entry-edit.component.css']
})
export class OilEntryEditComponent implements OnInit {
  oilEntryForm: FormGroup
  error = false
  submitted = false
  id: string
  entry: Observable<OilEntry>

  constructor(
    private oilEntryService: OilEntryService,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.oilEntryForm = this.formBuilder.group({
      plate: ['', [Validators.required]],
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
    })

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.loadData()
    })
  }

  get f() {
    return this.oilEntryForm.controls
  }

  private loadData() {
    this.entry = this.oilEntryService.getOne(this.id)
    this.entry.subscribe(data => {
      this.oilEntryForm.setValue({ ...data })
    })
  }

  onSubmit() {
    if (this.oilEntryForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const stationData: OilEntry = {
      plate: this.f.plate.value,
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
      grease: this.f.grease.value
    }

    this.oilEntryService.update(this.id, stationData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Despacho de lubricante actualizado con éxito')
        this.router.navigate(['entries/oil'])
      })
      .catch(error => {
        this.spinner.hide()
        this.showAlert('error', error)
      })
  }

  onDelete() {
    this.confirmationDialogService.confirm('Confirmación', '¿Estas seguro que deseas eliminarlo?', 'Sí, eliminar')
      .then(confirmed => {
        if (confirmed) {
          this.spinner.show()
          this.oilEntryService.delete(this.id)
            .then(response => {
              this.spinner.hide()
              this.showAlert('success', 'Despacho de lubricante eliminado con éxito')
              this.router.navigate(['entries/oil'])
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
}
