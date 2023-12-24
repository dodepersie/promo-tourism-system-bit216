import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';
import { AuthService } from 'src/app/_services/auth.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { SwalService } from 'src/app/_services/swal.service';
import { lastValueFrom } from 'rxjs';
import { PostOrder } from 'src/app/payment';
import { PaypalService } from 'src/app/_services/paypal.service';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.css'],
})
export class CheckoutProductComponent implements OnInit {
  product: Product | undefined;
  selectedDate: string;
  minDate: string;
  amount: number = 1;
  isDisabled: boolean = true;
  isLoggedIn: boolean = false;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private swalService: SwalService,
    private fb: FormBuilder,
    private paypalService: PaypalService
  ) {}

  get date() {
    return this.checkOutDataForm.get('travel_date')!;
  }
  get amountPeople() {
    return this.checkOutDataForm.get('total_purchase')!;
  }

  ngOnInit() {
    this.getData();

    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  getData() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];

      if (productId) {
        this.productService.getProduct(productId).subscribe({
          next: (product) => {
            this.product = product;
            // this.updatePayPalConfig();
            this.patchInputForm();
          },
          error(err) {
            console.error(err);
          },
        });
      }
    });
  }

  patchInputForm() {
    const userId = localStorage.getItem('user_id');
    if (this.product && this.checkOutDataForm) {
      this.checkOutDataForm.patchValue({
        customer_id: userId,
        product_id: this.product._id,
      });
    }
  }

  checkOutDataForm: FormGroup = this.fb.group({
    customer_id: ['', [Validators.required]],
    product_id: ['', [Validators.required]],
    travel_date: ['', [Validators.required]],
    total_purchase: [null, [Validators.required, Validators.min(1)]],
  });

  async checkOut() {
    const order: PostOrder = {
      customer_id: this.checkOutDataForm.value.customer_id,
      product_id: this.checkOutDataForm.value.product_id,
      travel_date: this.checkOutDataForm.value.travel_date,
      total_purchase: this.checkOutDataForm.value.total_purchase,
    };

    try {
      const getInvoice = await lastValueFrom(
        this.paypalService.createInvoice(order)
      );
      const getInvoicePay = await lastValueFrom(
        this.paypalService.createInvoicePay(getInvoice.invoice._id)
      );

      console.log('Payment URL:', getInvoicePay.payment_url);

      if (getInvoicePay.payment_url) {
        window.open(getInvoicePay.payment_url, '_blank');
      }
    } catch (err) {
      console.error(err);
    }
  }

  increaseAmount() {
    this.amount++;
    this.amountPeople.setValue(this.amount);
    // this.updatePayPalConfig();
  }

  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
      this.amountPeople.setValue(this.amount);
      // this.updatePayPalConfig();
    }
  }

  // updatePayPalConfig() {
  //   if (this.product) {
  //     const pricePerItem = this.product.price!;
  //     const totalPrice = pricePerItem * this.amount;
  //     this.initConfig(
  //       totalPrice.toString(),
  //       this.product.name!,
  //       this.amount.toString()
  //     );
  //   }
  // }
}
