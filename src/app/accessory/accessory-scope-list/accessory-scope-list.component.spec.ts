import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryScopeListComponent } from './accessory-scope-list.component';

describe('AccessoryScopeListComponent', () => {
  let component: AccessoryScopeListComponent;
  let fixture: ComponentFixture<AccessoryScopeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryScopeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryScopeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
