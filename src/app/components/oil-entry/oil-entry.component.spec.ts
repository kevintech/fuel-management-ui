import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilEntryComponent } from './oil-entry.component';

describe('OilEntryComponent', () => {
  let component: OilEntryComponent;
  let fixture: ComponentFixture<OilEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
