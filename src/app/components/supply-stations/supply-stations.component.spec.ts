import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyStationsComponent } from './supply-stations.component';

describe('SupplyStationsComponent', () => {
  let component: SupplyStationsComponent;
  let fixture: ComponentFixture<SupplyStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
