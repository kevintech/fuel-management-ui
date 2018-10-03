import { TestBed } from '@angular/core/testing';

import { ExcelDataReaderService } from './excel-data-reader.service';

describe('ExcelDataReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelDataReaderService = TestBed.get(ExcelDataReaderService);
    expect(service).toBeTruthy();
  });
});
