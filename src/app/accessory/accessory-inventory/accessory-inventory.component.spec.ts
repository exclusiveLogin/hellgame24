import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryInventoryComponent } from './accessory-inventory.component';

describe('AccessoryInventoryComponent', () => {
  let component: AccessoryInventoryComponent;
  let fixture: ComponentFixture<AccessoryInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
