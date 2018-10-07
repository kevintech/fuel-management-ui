import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEntryDetailComponent } from './fuel-entry-detail.component';

describe('FuelEntryDetailComponent', () => {
  let component: FuelEntryDetailComponent;
  let fixture: ComponentFixture<FuelEntryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelEntryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEntryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
