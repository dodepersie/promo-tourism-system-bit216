import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/_services/swal.service';

@Component({
  selector: 'app-register-merchant-form-two',
  templateUrl: './register-merchant-form-two.component.html',
  styleUrls: ['./register-merchant-form-two.component.css'],
})
export class RegisterMerchantFormTwoComponent implements OnInit {
  @Input() registerMerchantForm!: FormGroup;

  @Output() formSubmitted = new EventEmitter<User>();

  constructor(private swalService: SwalService, private router: Router) {}

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
    });
  }

  onFormSubmit() {
    const formData = this.registerMerchantForm.value;
    this.swalService.successSwal(
      'Register Merchant Success! Wait for Officer approval..'
    );
    this.router.navigate(['/']);
    this.formSubmitted.emit(formData);
  }
}
