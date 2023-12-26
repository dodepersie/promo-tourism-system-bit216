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
  constructor(

  ) {}

  ngOnInit(): void {

  }
}
