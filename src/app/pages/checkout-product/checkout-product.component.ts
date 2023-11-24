import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-product',
  templateUrl: './checkout-product.component.html',
  styleUrls: ['./checkout-product.component.css'],
})
export class CheckoutProductComponent implements OnInit {
  product: Product | undefined;
  selectedDate: string;
  minDate: string;
  checkOutDataForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  get date() {
    return this.checkOutDataForm.get('date')!;
  }
  get amountPeople() {
    return this.checkOutDataForm.get('amountPeople')!;
  }

  ngOnInit(): void {
    this.getData();

    this.checkOutDataForm = new FormGroup({
      date: new FormControl('', Validators.required),
      amountPeople: new FormControl(1, Validators.required),
    });
  }

  getData() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];

      if (productId) {
        this.productService.getProduct(productId).subscribe({
          next: (product) => {
            this.product = product;
          },
          error(err) {
            console.error(err);
          },
        });
      }
    });
  }

  processPayment() {
    if (this.checkOutDataForm.valid && this.product && this.product.price) {
      const dateValue = this.date.value;
      const amountPeopleValue = this.amountPeople.value;
      const totalPrice = +this.product.price * +amountPeopleValue;

      Swal.fire({
        icon: 'question',
        title: 'Confirm your order before making payment..',
        showCancelButton: true,
        html: `
          <p>Date entered: ${dateValue}</p>
          <p>Amount of People: ${amountPeopleValue}</p>
          <p>Total Price: RM ${totalPrice.toFixed(2)}</p>
        `,
      }).then((result) => {
        if (result.isConfirmed) {
          // API Midtrans Here

          Swal.fire(
            'Redirecting..',
            'You will be navigate to the Midtrans Payment Gateway to complete your order..',
            'info'
          );
        } else {
          Swal.fire('Okay, action canceled!', '', 'info');
        }
      });
    }
  }
}
