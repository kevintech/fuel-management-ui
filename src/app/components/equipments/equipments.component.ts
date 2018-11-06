import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { Equipment } from '../../models/equipment/equipment.model';
import { EquipmentsReportHeaders } from './equipments-report-headers';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})

export class EquipmentsComponent implements OnInit {
  equipmentItems: Observable<Equipment[]>
  reportData: Equipment[];

  constructor(
    private equipmentService: EquipmentService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.reportData = new Array();
    this.equipmentItems = this.equipmentService.getAll()
  }

  exportData(): void {
    this.spinner.show();

    this.equipmentService.getAll().subscribe(data => {
      this.reportData = data;
      this.downloadReport();
    }, error => {
      console.log('Get all equipments error => ', error);
    });
  }

  private downloadReport(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      EquipmentsReportHeaders
    ].concat(this.getReportData()));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'equipments.xlsx');
    this.spinner.hide();
  }

  private getReportData() {
    let reportArrayData = Array();
    this.reportData.forEach(row => {
      reportArrayData.push([
        row.description,
        row.code,
        row.brand,
        row.year,
        row.model,
        row.serial,
        row.type,
        row.plate,
        row.engineBrand,
        row.engineModel,
        row.engineSerial,
        row.registrationCert,
        row.idCard,
        row.purchaseValue,
        row.receptionDate,
        row.declarationNumber,
        row.bl,
        row.freight,
        row.protectionDevice,
        row.protectionDeviceDateExpiration,
        row.insurancePolicy,
        row.insuranceExpirationDate,
        row.importationDate,
        row.importationVat,
        row.importationDai,
        row.company,
        row.status
      ]);
    });

    return reportArrayData;
  }
}
