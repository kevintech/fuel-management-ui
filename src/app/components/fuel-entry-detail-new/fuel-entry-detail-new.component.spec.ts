import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEntryDetailNewComponent } from './fuel-entry-detail-new.component';

describe('FuelEntryDetailNewComponent', () => {
  let component: FuelEntryDetailNewComponent;
  let fixture: ComponentFixture<FuelEntryDetailNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelEntryDetailNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEntryDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
