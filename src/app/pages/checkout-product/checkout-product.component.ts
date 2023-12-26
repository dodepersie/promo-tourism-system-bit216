import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';
import { AuthService } from 'src/app/_services/auth.service';
import { SwalService } from 'src/app/_services/swal.service';
import { lastValueFrom } from 'rxjs';
import { PostOrder } from 'src/app/payment';
import { PaypalService } from 'src/app/_services/paypal.service';
import { GlobalService } from 'src/app/_services/global.service';

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
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private swalService: SwalService,
    public globalService: GlobalService,
    private fb: FormBuilder,
    private paypalService: PaypalService
  ) {}

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
        total_purchase: 1,
      });
    }
  }

  flatPickrConfig = {
    dateFormat: 'Y-m-d',
    minDate: 'today',
    altInput: true,
    altFormat: 'F j, Y',
  };

  checkOutDataForm: FormGroup = this.fb.group({
    customer_id: ['', [Validators.required]],
    product_id: ['', [Validators.required]],
    travel_date: ['', [Validators.required]],
    total_purchase: [null, [Validators.required, Validators.min(1)]],
  });

  async checkOut() {
    if (!this.isLoggedIn) {
      this.swalService
        .errorSwal('Please login first to purchase..')
        .then(() => {
          this.globalService.isModalLoginOpen = true;
        });
      this.isLoading = false;
      return;
    }

    if (this.checkOutDataForm.invalid) {
      this.swalService.errorSwal('Please fill all required data!');
      this.checkOutDataForm.markAllAsTouched();
      this.checkOutDataForm.markAsDirty();
      return;
    }

    try {
      this.isLoading = true;
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

        this.swalService
          .infoSwal(
            'You will be redirect to PayPal to complete your purchase..'
          )
          .then(() => {
            if (getInvoicePay.payment_url) {
              window.open(getInvoicePay.payment_url, '_blank');
            }
          });

        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
      }
    } catch (err) {
      console.error(err);
      this.isLoading = false;
    }
  }

  increaseAmount() {
    this.amount++;
    this.checkOutDataForm.get('total_purchase')!.setValue(this.amount);
  }

  decreaseAmount() {
    if (this.amount > 1) {
      this.amount--;
      this.checkOutDataForm.get('total_purchase')!.setValue(this.amount);
    }
  }
}
