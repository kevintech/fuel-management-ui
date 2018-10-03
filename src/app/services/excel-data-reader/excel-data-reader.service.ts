import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelDataReaderService {

  private data: Array<any>;

  constructor() { }

  public get<T>(): Array<T> {
    return this.data;
  }

  public read<T>(fileTarget: any, fileHeaders: string[], cb: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(fileTarget);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json<T>(ws, { raw: false, header: fileHeaders });
      if (cb) cb(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
