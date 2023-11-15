import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserIndexComponent } from './dashboard-user-index.component';

describe('DashboardUserIndexComponent', () => {
  let component: DashboardUserIndexComponent;
  let fixture: ComponentFixture<DashboardUserIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUserIndexComponent]
    });
    fixture = TestBed.createComponent(DashboardUserIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
