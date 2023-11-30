import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTourismProductComponent } from './review-tourism-product.component';

describe('ReviewTourismProductComponent', () => {
  let component: ReviewTourismProductComponent;
  let fixture: ComponentFixture<ReviewTourismProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewTourismProductComponent]
    });
    fixture = TestBed.createComponent(ReviewTourismProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
