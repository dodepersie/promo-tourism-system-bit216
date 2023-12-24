import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { GlobalService } from 'src/app/_services/global.service';
import { MerchantService } from 'src/app/_services/merchant.service';
import { SwalService } from 'src/app/_services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private merchant: MerchantService,
    private swalService: SwalService,
    public globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

 login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        const parsedData = JSON.parse(res);
        localStorage.setItem('user_id', parsedData.data._id);
        localStorage.setItem('token', parsedData.token);

        // Get Local Storage Data
        const userId = localStorage.getItem('user_id');

        // Get first login on Merchant here
        if (parsedData.userType == 'merchant') {
          if (userId) {
            this.merchant.getMerchant(userId).subscribe({
              next: (merchant) => {
                const isFirstLogin = merchant.isFirstLogin;

                if (merchant.status == 'Approved') {
                  if (isFirstLogin) {
                    this.router.navigate([
                      '/user-dashboard/change-merchant-password',
                    ]);
                  } else {
                    this.authService.isLoggedIn$.next(true);
                    this.router.navigate(['/user-dashboard']);
                  }
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
          }
        }

        // User Login
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['/user-dashboard']);
      },
      error: (err) => {
        this.swalService.errorSwal(err.error);
      },
    });
  }
}
