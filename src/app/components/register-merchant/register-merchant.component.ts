import { Directionality } from '@angular/cdk/bidi';
import { CdkStepper } from '@angular/cdk/stepper';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../user';
import { Router } from '@angular/router';
import { MerchantService } from 'src/app/_services/merchant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.css'],
  providers: [{ provide: CdkStepper, useExisting: RegisterMerchantComponent }],
})
export class RegisterMerchantComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected = true;

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  registerMerchantForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    _dir: Directionality,
    _changeDetectorRef: ChangeDetectorRef,
    _elementRef: ElementRef<HTMLElement>,
    private router: Router,
    private merchantService: MerchantService
  ) {
    super(_dir, _changeDetectorRef, _elementRef);
  }

  ngOnInit(): void {
    this.registerMerchantForm = new FormGroup({
      merchantData: new FormGroup({
        name: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        companyDesc: new FormControl('', Validators.required),
      }),

      merchantDoc: new FormGroup({
        documentName: new FormControl('', Validators.required),
        documentDesc: new FormControl('', Validators.required),
        documentData: new FormControl('', Validators.required),
      }),
    });
  }

  addMerchant(user: User) {
    this.merchantService.createMerchant(user).subscribe({
      next: () => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Register Merchant Success!',
        //   text: 'You need to wait approval from Tourism Ministry Officer!',
        // });
        // this.router.navigate(['/login']);
      },
      error: (err) => {
        let errorMessage =
          'Failed to create User, try to contact Administrator!';

          if(err.error) {
            errorMessage = err.error;
          }

        Swal.fire({
          icon: 'error',
          title: 'Register Failed!',
          text: errorMessage,
        });
      },
    });
  }
}
