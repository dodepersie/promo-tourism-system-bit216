import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMerchantPasswordComponent } from './change-merchant-password.component';

describe('ChangeMerchantPasswordComponent', () => {
  let component: ChangeMerchantPasswordComponent;
  let fixture: ComponentFixture<ChangeMerchantPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeMerchantPasswordComponent]
    });
    fixture = TestBed.createComponent(ChangeMerchantPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
