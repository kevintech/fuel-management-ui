import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EquipmentsNewComponent } from './equipment-new.component'

describe('EquipmentsNewComponent', () => {
  let component: EquipmentsNewComponent
  let fixture: ComponentFixture<EquipmentsNewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsNewComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsNewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
