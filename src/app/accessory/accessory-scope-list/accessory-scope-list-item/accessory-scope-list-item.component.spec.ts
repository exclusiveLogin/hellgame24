import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryScopeListItemComponent } from './accessory-scope-list-item.component';

describe('AccessoryScopeListItemComponent', () => {
  let component: AccessoryScopeListItemComponent;
  let fixture: ComponentFixture<AccessoryScopeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryScopeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryScopeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
