import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilEntryNewComponent } from './oil-entry-new.component';

describe('OilEntryNewComponent', () => {
  let component: OilEntryNewComponent;
  let fixture: ComponentFixture<OilEntryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilEntryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilEntryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
