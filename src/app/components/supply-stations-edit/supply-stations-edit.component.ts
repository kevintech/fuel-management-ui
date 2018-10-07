import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { SupplyStationService } from '../../services/supply-station/supply-station.service'
import { SupplyStation } from '../../models/supply-station/supply-station.model'
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service'
import { NotifierService } from 'angular-notifier'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-supply-stations-edit',
  templateUrl: './supply-stations-edit.component.html',
  styleUrls: ['./supply-stations-edit.component.css']
})
export class SupplyStationsEditComponent implements OnInit {
  stationForm: FormGroup
  error = false
  submitted = false
  id: string
  station: Observable<SupplyStation>

  constructor(
    private stationService: SupplyStationService,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.stationForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', []],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })

    this.route.params.subscribe(params => {
      this.id = params['id']
      this.loadData()
    })
  }

  get f() {
    return this.stationForm.controls
  }

  private loadData() {
    this.station = this.stationService.get(this.id)
    this.station.subscribe(data => {
      this.stationForm.setValue({ ...data })
    })
  }

  onSubmit() {
    if (this.stationForm.invalid) {
      this.submitted = true
      this.error = true
      return true
    }

    this.spinner.show()

    const stationData: SupplyStation = {
      code: this.f.code.value,
      description: this.f.description.value,
      address: this.f.address.value,
      phone: this.f.phone.value,
      status: this.f.status.value
    }

    this.stationService.update(this.id, stationData)
      .then(response => {
        this.spinner.hide()
        this.showAlert('success', 'Estación de servicio actualizada con éxito')
        this.router.navigate(['settings/stations'])
      })
      .catch(error => {
        this.spinner.hide()
        this.showAlert('error', error)
      })
  }

  onDelete() {
    this.confirmationDialogService.confirm('Confirmación', '¿Estas seguro que deseas eliminarla?', 'Sí, eliminar')
      .then(confirmed => {
        if (confirmed) {
          this.spinner.show()
          this.stationService.delete(this.id)
            .then(response => {
              this.spinner.hide()
              this.showAlert('success', 'Estación de servicio eliminada con éxito')
              this.router.navigate(['settings/stations'])
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
