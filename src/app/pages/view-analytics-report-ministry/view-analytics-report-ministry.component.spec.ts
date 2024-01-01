import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnalyticsReportMinistryComponent } from './view-analytics-report-ministry.component';

describe('ViewAnalyticsReportMinistryComponent', () => {
  let component: ViewAnalyticsReportMinistryComponent;
  let fixture: ComponentFixture<ViewAnalyticsReportMinistryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnalyticsReportMinistryComponent]
    });
    fixture = TestBed.createComponent(ViewAnalyticsReportMinistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
