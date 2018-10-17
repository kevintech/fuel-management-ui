import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEntryReportComponent } from './fuel-entry-report.component';

describe('FuelEntryReportComponent', () => {
  let component: FuelEntryReportComponent;
  let fixture: ComponentFixture<FuelEntryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelEntryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEntryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
