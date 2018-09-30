import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBatchLoadComponent } from './equipment-batch-load.component';

describe('EquipmentBatchLoadComponent', () => {
  let component: EquipmentBatchLoadComponent;
  let fixture: ComponentFixture<EquipmentBatchLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentBatchLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentBatchLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
