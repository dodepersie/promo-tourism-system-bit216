import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/_services/merchant.service';
import { ProductService } from 'src/app/_services/product.service';
import { Merchant } from 'src/app/merchant';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  merchant: Merchant | undefined;
  product: Product | undefined;

  constructor(
    private merchantService: MerchantService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
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
