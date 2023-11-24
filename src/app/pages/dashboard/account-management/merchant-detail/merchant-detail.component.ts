import { Component, OnInit, inject } from '@angular/core';
import { MerchantService } from 'src/app/_services/merchant.service';
import { Merchant } from 'src/app/merchant';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css'],
})
export class MerchantDetailComponent implements OnInit {
  merchant: Merchant | undefined;
  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  goBack() {
    this.location.back();
  }

  getData() {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
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
        console.error('User ID not found in URL');
      }
    });
  }

  /*
    Send Email to Merchant if account registration is approved
  */
  sendEmail(merchantName: string, merchantEmail: string) {
    const message = `
   <p>Your account have been Approved.</p>
   <p>Now you can login with default password:</p>
   <p><strong>Merchant#1234!</strong></p>
   <br />
   <p><strong>Make sure to change your password..</strong></p>
   `;

    const templateParams = {
      to_name: merchantName,
      to: merchantEmail,
      message: message,
    };

    emailjs
      .send(
        'service_msl9hhn',
        'template_w710cnp',
        templateParams,
        'ZIPayw6QLma7NMD-5'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
        },
        (error) => {
          console.error(error.text);
        }
      );
  }

  /*
    Approve Merchant By ID
  */
  approveMerchant(merchantId: string) {
    this.merchantService
      .updateMerchantStatus(merchantId, 'Approved')
      .subscribe({
        next: (merchant) => {
          const merchantObject = JSON.parse(merchant);

          Swal.fire({
            icon: 'success',
            title: `${merchantObject.name} already approved!`,
          });

          // Send email
          this.sendEmail(merchantObject.name, merchantObject.email);

          // Navigate back
          this.router.navigate(['/user-dashboard/account-management']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to approve merchant. Please try again.',
          });
        },
      });
  }

  /*
    Reject Merchant By ID
  */
  rejectMerchant(merchantId: string) {
    this.merchantService
      .updateMerchantStatus(merchantId, 'Rejected')
      .subscribe({
        next: (merchant) => {
          const merchantObject = JSON.parse(merchant);

          Swal.fire({
            icon: 'success',
            title: `${merchantObject.name} already rejected!`,
          });

          // Navigate back
          this.router.navigate(['/user-dashboard/account-management']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to approve merchant. Please try again.',
          });
        },
      });
  }
}
