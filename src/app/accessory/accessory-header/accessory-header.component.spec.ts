import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryHeaderComponent } from './accessory-header.component';

describe('AccessoryHeaderComponent', () => {
  let component: AccessoryHeaderComponent;
  let fixture: ComponentFixture<AccessoryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
