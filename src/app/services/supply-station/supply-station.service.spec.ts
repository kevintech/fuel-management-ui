import { TestBed } from '@angular/core/testing';

import { SupplyStationService } from './supply-station.service';

describe('SupplyStationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplyStationService = TestBed.get(SupplyStationService);
    expect(service).toBeTruthy();
  });
});
