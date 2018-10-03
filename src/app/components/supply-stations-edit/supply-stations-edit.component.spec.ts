import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyStationsEditComponent } from './supply-stations-edit.component';

describe('SupplyStationsEditComponent', () => {
  let component: SupplyStationsEditComponent;
  let fixture: ComponentFixture<SupplyStationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyStationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyStationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
