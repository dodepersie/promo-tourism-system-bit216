import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPagesComponent } from './review-pages.component';

describe('ReviewPagesComponent', () => {
  let component: ReviewPagesComponent;
  let fixture: ComponentFixture<ReviewPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewPagesComponent]
    });
    fixture = TestBed.createComponent(ReviewPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
