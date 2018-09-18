import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyStationsNewComponent } from './supply-stations-new.component';

describe('SupplyStationsNewComponent', () => {
  let component: SupplyStationsNewComponent;
  let fixture: ComponentFixture<SupplyStationsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyStationsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyStationsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
