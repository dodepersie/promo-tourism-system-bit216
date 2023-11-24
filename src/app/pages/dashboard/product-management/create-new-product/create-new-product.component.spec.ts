import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProductComponent } from './create-new-product.component';

describe('CreateNewProductComponent', () => {
  let component: CreateNewProductComponent;
  let fixture: ComponentFixture<CreateNewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewProductComponent]
    });
    fixture = TestBed.createComponent(CreateNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
