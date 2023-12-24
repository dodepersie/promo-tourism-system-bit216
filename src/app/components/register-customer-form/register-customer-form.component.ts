import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../user';

@Component({
  selector: 'app-register-customer-form',
  templateUrl: './register-customer-form.component.html'
})
export class RegisterCustomerFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.userForm.get('name')!;
  }
  get username() {
    return this.userForm.get('username')!;
  }
  get email() {
    return this.userForm.get('email')!;
  }
  get password() {
    return this.userForm.get('password')!;
  }

  ngOnInit() {
    this.initialState.subscribe(() => {
      this.userForm = this.fb.group({
        name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      });
    });

    this.userForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }

  submitForm() {
    this.formSubmitted.emit(this.userForm.value);
  }
}
