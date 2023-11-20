import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.registerMerchantForm = this.fb.group({
      documentName: ['', [Validators.required]],
      documentData: [''],
    })
  }

  onFormSubmit() {
    const formData = this.registerMerchantForm.value;
    Swal.fire({
      icon: 'success',
      title: 'Register Merchant Success!',
      text: 'You need to wait approval from Tourism Ministry Officer!',
    });
    this.router.navigate(['/login']);
    this.formSubmitted.emit(formData);
  }
}
