import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBatchLoadComponent } from './driver-batch-load.component';

describe('DriverBatchLoadComponent', () => {
  let component: DriverBatchLoadComponent;
  let fixture: ComponentFixture<DriverBatchLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBatchLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBatchLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
