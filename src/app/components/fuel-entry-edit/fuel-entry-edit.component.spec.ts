import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEntryEditComponent } from './fuel-entry-edit.component';

describe('FuelEntryEditComponent', () => {
  let component: FuelEntryEditComponent;
  let fixture: ComponentFixture<FuelEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
