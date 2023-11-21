import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../user';

@Component({
  selector: 'app-register-merchant-form',
  templateUrl: './register-merchant-form.component.html',
})
export class RegisterMerchantFormComponent implements OnInit {
  @Input() initialState: BehaviorSubject<User> = new BehaviorSubject({});
  @Input() registerMerchantForm: FormGroup = new FormGroup({});
  // @Input() registerMerchantForm!: FormGroup;
  @Output() formValuesChanged = new EventEmitter<User>();
  @Output() formSubmitted = new EventEmitter<User>();

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.registerMerchantForm.get('name');
  }
  get phoneNumber() {
    return this.registerMerchantForm.get('phoneNumber');
  }
  get email() {
    return this.registerMerchantForm.get('email');
  }
  get companyDesc() {
    return this.registerMerchantForm.get('companyDesc');
  }

  ngOnInit(): void {
    this.initialState.subscribe((user) => {
      this.registerMerchantForm = this.fb.group({
        name: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: [
          '',
          [Validators.compose([Validators.email, Validators.required])],
        ],
        companyDesc: ['', [Validators.required]],
      });
    });

    this.registerMerchantForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }

  onFormSubmit() {
    const formData = this.registerMerchantForm.value;
    this.formSubmitted.emit(formData);
  }
}
