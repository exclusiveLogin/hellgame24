import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrendComponent } from 'app/logs/user-trend/user-trend.component';

describe('UserTrendComponent', () => {
  let component: UserTrendComponent;
  let fixture: ComponentFixture<UserTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
