import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnalyticsReportComponent } from './view-analytics-report.component';

describe('ViewAnalyticsReportComponent', () => {
  let component: ViewAnalyticsReportComponent;
  let fixture: ComponentFixture<ViewAnalyticsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnalyticsReportComponent]
    });
    fixture = TestBed.createComponent(ViewAnalyticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
