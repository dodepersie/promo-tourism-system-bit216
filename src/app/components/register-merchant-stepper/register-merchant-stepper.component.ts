import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register-merchant-stepper',
  templateUrl: './register-merchant-stepper.component.html',
  styleUrls: ['./register-merchant-stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: RegisterMerchantStepperComponent }],
})
export class RegisterMerchantStepperComponent extends CdkStepper {
  @Input() linearModeSelected = true;

  onClick(index: number) {
    this.selectedIndex = index;
  }
}
