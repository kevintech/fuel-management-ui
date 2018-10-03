import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEntryNewComponent } from './fuel-entry-new.component';

describe('FuelEntryNewComponent', () => {
  let component: FuelEntryNewComponent;
  let fixture: ComponentFixture<FuelEntryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelEntryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEntryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
