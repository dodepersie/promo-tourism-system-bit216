import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/_services/merchant.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReviewService } from 'src/app/_services/review.service';
import { UserService } from 'src/app/_services/user.service';
import { Merchant } from 'src/app/merchant';
import { Review, ReviewUser, ReviewWithUser, postReview } from 'src/app/payment';
import { Product } from 'src/app/product';
import { User } from 'src/app/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  merchant: Merchant | undefined;
  product: Product | undefined;
  reviews: postReview[] | undefined;
  reviewsWithUsers: ReviewWithUser[] = [];

  constructor(
    private merchantService: MerchantService,
    private productService: ProductService,
    private reviewService: ReviewService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getAverageRating(reviews: postReview[]): number {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  }

  getData() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProduct(productId).subscribe({
          next: (product) => {
            this.product = product;
            if (product && product.merchant_id) {
              this.getMerchantData(product.merchant_id);
            } else {
              console.error('Merchant ID not found in the product data');
            }
          },
          error: (error) => {
            console.error(error);
          },
        });

        this.reviewService.getReviewByProductId(productId).subscribe({
          next: (reviews: ReviewUser[]) => {
            this.reviews = reviews;

            reviews.forEach((review) => {
              const userId = review.user_id;
              this.userService.getUser(userId).subscribe({
                next: (user: User) => {
                  const reviewWithUser: ReviewWithUser = {
                    reviewData: review,
                    userData: user,
                  };
                  this.reviewsWithUsers.push(reviewWithUser);

                  this.reviewsWithUsers.sort((a, b) => {
                    const dateA = new Date(a.reviewData.createdAt).getTime();
                    const dateB = new Date(b.reviewData.createdAt).getTime();
                    return dateB - dateA;
                  });
                },
                error: (userError) => {
                  console.error('Error fetching user:', userError);
                },
              });
            });
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        console.error('Product ID is not found in URL');
      }
    });
  }

  getMerchantData(merchantId: string) {
    this.merchantService.getMerchant(merchantId).subscribe({
      next: (merchant) => {
        this.merchant = merchant;
      },
      error(err) {
        console.error(err);
      },
    });
  }
}
