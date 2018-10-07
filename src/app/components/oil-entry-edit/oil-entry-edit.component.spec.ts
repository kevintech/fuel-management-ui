import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilEntryEditComponent } from './oil-entry-edit.component';

describe('OilEntryEditComponent', () => {
  let component: OilEntryEditComponent;
  let fixture: ComponentFixture<OilEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
