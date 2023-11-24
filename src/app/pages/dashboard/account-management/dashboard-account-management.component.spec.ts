import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountManagementComponent } from './dashboard-account-management.component';

describe('DashboardAccountManagementComponent', () => {
  let component: DashboardAccountManagementComponent;
  let fixture: ComponentFixture<DashboardAccountManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardAccountManagementComponent]
    });
    fixture = TestBed.createComponent(DashboardAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
