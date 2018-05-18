import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryCrafterComponent } from './accessory-crafter.component';

describe('AccessoryCrafterComponent', () => {
  let component: AccessoryCrafterComponent;
  let fixture: ComponentFixture<AccessoryCrafterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryCrafterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryCrafterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
