import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversNewComponent } from './drivers-new.component';

describe('DriversNewComponent', () => {
  let component: DriversNewComponent;
  let fixture: ComponentFixture<DriversNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
