import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipment } from '../../models/equipment/equipment.model';
import { EquipmentFileHeaders } from './equipment-file-headers';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelDataReaderService } from '../../services/excel-data-reader/excel-data-reader.service';

@Component({
  selector: 'app-equipment-batch-load',
  templateUrl: './equipment-batch-load.component.html',
  styleUrls: ['./equipment-batch-load.component.css']
})
export class EquipmentBatchLoadComponent implements OnInit {
  batchLoadForm: FormGroup;
  error = false;
  submitted = false;
  loaded = false;
  data: Array<Equipment>;

  constructor(
    private equipmentService: EquipmentService,
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

    this.equipmentService.deleteAll()
      .then(
        () => {
          return this.equipmentService.saveAll(this.data);
        },
        (error) => this.showAlert('error', error)
      )
      .then(() => {
        this.showAlert('success', 'Pilotos cargados con éxito');
        this.router.navigate(['settings/equipments']);
      }, (error) => this.showAlert('error', error))
      .then(() => this.spinner.hide());
  }

  onFileChange(evt: any) {
    this.excelDataReader.read<Equipment>(evt.target, EquipmentFileHeaders, (data)=> {
      this.data = data;
      this.loaded = true;
    });
  }

  showAlert(type: string, message: string): void {
    this.notifierService.hideAll();
    this.notifierService.notify(type, message);
  }

}
