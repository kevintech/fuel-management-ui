import { TestBed } from '@angular/core/testing';

import { OilEntryService } from './oil-service.service';

describe('OilEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OilEntryService = TestBed.get(OilEntryService);
    expect(service).toBeTruthy();
  });
});
