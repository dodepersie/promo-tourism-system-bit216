import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { MerchantService } from 'src/app/_services/merchant.service';
import { Merchant } from 'src/app/merchant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-merchant-password',
  templateUrl: './change-merchant-password.component.html',
  styleUrls: ['./change-merchant-password.component.css'],
})
export class ChangeMerchantPasswordComponent implements OnInit {
  merchant: Merchant | undefined;
  changePasswordForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private merchantService: MerchantService
  ) {}

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  ngOnInit(): void {
    this.getUser();

    this.changePasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  getUser() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.merchantService.getMerchant(userId).subscribe({
        next: (merchant) => {
          this.merchant = merchant;
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      console.log('User with that ID not found on local storage..');
    }
  }

  checkUserFirstLogin() {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      // Check first login
      this.merchantService.getMerchant(userId).subscribe({
        next: (merchant) => {
          if (merchant.isFirstLogin) {
            this.merchantService
              .updateMerchantIsFirstLogin(userId, false)
              .subscribe({
                next: () => {
                  console.log('Updated to false..');
                },
                error(err) {
                  console.error(err);
                },
              });
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  changePassword() {
    const userId = localStorage.getItem('user_id');
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmNewPassword =
      this.changePasswordForm.get('confirmNewPassword')?.value;

    if (userId && newPassword === confirmNewPassword) {
      this.authService.changeMerchantPassword(userId, newPassword).subscribe({
        next: () => {
          this.checkUserFirstLogin();

          Swal.fire({
            icon: 'success',
            title: 'Password changed successfully!',
          });

          // Reset form
          this.changePasswordForm.reset();
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'warning',
            title: error.error,
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'New Password and Confirm New Password are mismatch!',
      });
    }
  }
}
