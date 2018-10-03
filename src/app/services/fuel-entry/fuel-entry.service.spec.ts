import { TestBed } from '@angular/core/testing';

import { FuelEntryService } from './fuel-entry.service';

describe('FuelEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FuelEntryService = TestBed.get(FuelEntryService);
    expect(service).toBeTruthy();
  });
});
