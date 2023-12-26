import { Component, OnInit } from '@angular/core';
import { PaypalService } from 'src/app/_services/paypal.service';
import { Invoice } from 'src/app/payment';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-review-tourism-product',
  templateUrl: './review-tourism-product.component.html',
  styleUrls: ['./review-tourism-product.component.css'],
})
export class ReviewTourismProductComponent implements OnInit {
  purchaseData: Invoice[] | any;
  products: Product[] = [];

  constructor(private paypalService: PaypalService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = localStorage.getItem('user_id');
    if (userId !== null) {
      this.paypalService.getUserOrder(userId).subscribe({
        next: (purchaseData) => {
          this.purchaseData = purchaseData;
        },
        error(err) {
          console.error(err);
        },
      });
    } else {
      console.log('User ID not found..');
    }
  }
}
