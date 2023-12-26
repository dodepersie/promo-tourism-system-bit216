import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalService } from 'src/app/_services/paypal.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReviewService } from 'src/app/_services/review.service';
import { SwalService } from 'src/app/_services/swal.service';
import { postReview } from 'src/app/payment';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-review-pages',
  templateUrl: './review-pages.component.html',
  styleUrls: ['./review-pages.component.css'],
})
export class ReviewPagesComponent implements OnInit {
  productData: Product | null;
  constructor(
    private paypalService: PaypalService,
    private productService: ProductService,
    private reviewService: ReviewService,
    private swalService: SwalService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const purchaseId = params['id'];
      this.paypalService.getInvoiceDBById(purchaseId).subscribe({
        next: (purchaseData) => {
          this.productService.getProduct(purchaseData.product_id).subscribe({
            next: (productData) => {
              this.productData = productData;
              this.patchInputForm(purchaseId);
            },
            error: (err) => {
              console.error(err);
            },
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }

  patchInputForm(purchaseId: string) {
    const userId = localStorage.getItem('user_id');
    if (this.productData && this.reviewForm) {
      this.reviewForm.patchValue({
        user_id: userId,
        product_id: this.productData._id,
        purchase_id: purchaseId,
      });
    }
  }

  reviewForm: FormGroup = this.fb.group({
    user_id: ['', [Validators.required]],
    product_id: ['', [Validators.required]],
    purchase_id: ['', [Validators.required]],
    rating: ['', [Validators.required]],
    review: ['', [Validators.required]],
  });

  submitReview() {
    const review: postReview = {
      user_id: this.reviewForm.value.user_id,
      product_id: this.reviewForm.value.product_id,
      purchase_id: this.reviewForm.value.purchase_id,
      rating: this.reviewForm.value.rating,
      review: this.reviewForm.value.review,
    };

    if (this.reviewForm.invalid) {
      this.swalService.errorSwal('Please fill all required form!..');
      return;
    }

    // Send service
    this.reviewService.createReview(review).subscribe({
      next: (review) => {
        console.log(review);
        this.swalService.successSwal('Review submitted.. :)');
        this.router.navigate(['/user-dashboard/purchase-history']);
      },
      error: (err) => {
        console.error(err);
        this.swalService.errorSwal(err.message);
      },
    });
  }
}
