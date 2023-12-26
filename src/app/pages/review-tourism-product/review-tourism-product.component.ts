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

  constructor(private paypalService: PaypalService) {}

  ngOnInit(): void {

  }
}
