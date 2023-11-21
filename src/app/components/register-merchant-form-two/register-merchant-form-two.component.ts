import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-merchant-form-two',
  templateUrl: './register-merchant-form-two.component.html',
  styleUrls: ['./register-merchant-form-two.component.css'],
})
export class RegisterMerchantFormTwoComponent implements OnInit {
  @Input() registerMerchantForm!: FormGroup;

  @Output() formSubmitted = new EventEmitter<User>();

  constructor(private fb: FormBuilder, private router: Router) {}

  get documentName() {
    return this.registerMerchantForm.get('documentName');
  }
  get documentDesc() {
    return this.registerMerchantForm.get('documentDesc');
  }
  get documentData() {
    return this.registerMerchantForm.get('documentData');
  }

  ngOnInit(): void {
    this.registerMerchantForm = new FormGroup({
      documentName: new FormControl('', Validators.required),
      documentDesc: new FormControl('', Validators.required),
      documentData: new FormControl(),
    })
  }

  onFormSubmit() {
    const formData = this.registerMerchantForm.value;
    Swal.fire({
      icon: 'success',
      title: 'Register Merchant Success!',
      text: 'We need to make decision for your registration and will inform you soon..',
    });
    this.router.navigate(['/login']);
    this.formSubmitted.emit(formData);
  }
}
