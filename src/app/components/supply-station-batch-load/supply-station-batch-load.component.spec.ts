import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyStationBatchLoadComponent } from './supply-station-batch-load.component';

describe('SupplyStationBatchLoadComponent', () => {
  let component: SupplyStationBatchLoadComponent;
  let fixture: ComponentFixture<SupplyStationBatchLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyStationBatchLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyStationBatchLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
