import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMerchantStepperComponent } from './register-merchant-stepper.component';

describe('RegisterMerchantStepperComponent', () => {
  let component: RegisterMerchantStepperComponent;
  let fixture: ComponentFixture<RegisterMerchantStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterMerchantStepperComponent]
    });
    fixture = TestBed.createComponent(RegisterMerchantStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
