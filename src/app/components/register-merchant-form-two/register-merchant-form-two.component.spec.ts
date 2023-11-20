import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMerchantFormTwoComponent } from './register-merchant-form-two.component';

describe('RegisterMerchantFormTwoComponent', () => {
  let component: RegisterMerchantFormTwoComponent;
  let fixture: ComponentFixture<RegisterMerchantFormTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMerchantFormTwoComponent]
    });
    fixture = TestBed.createComponent(RegisterMerchantFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
