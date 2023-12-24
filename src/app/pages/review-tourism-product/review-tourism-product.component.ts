import { Component, OnInit } from '@angular/core';
import { from, pipe } from 'rxjs';
import { PaypalService } from 'src/app/_services/paypal.service';
import { ProductService } from 'src/app/_services/product.service';
import { Invoice } from 'src/app/payment';

@Component({
  selector: 'app-review-tourism-product',
  templateUrl: './review-tourism-product.component.html',
  styleUrls: ['./review-tourism-product.component.css']
})
export class ReviewTourismProductComponent implements OnInit {

  purchaseData: Invoice[] | any;

  constructor(
    private paypalService: PaypalService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = localStorage.getItem('user_id');
    if(userId !== null) {
      this.paypalService.getUserOrder(userId).subscribe({
        next: (purchaseData) => {
          this.purchaseData = purchaseData

          console.log(purchaseData);

          // Get Product ID by the purchaseData.product_id
          this.productService.getProduct(purchaseData.product_id).subscribe({
            next: (productData) => {
              console.log("Product Data:", productData);
            }
          })
        },
        error(err) {
            console.error(err);
        },
      })
    } else {
      console.log("User ID not found..")
    }
  }
}
