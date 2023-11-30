import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MidtransService } from 'src/app/_services/midtrans.service';
import { ProductService } from 'src/app/_services/product.service';
import { environments } from 'src/app/environments/environments';
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
  midtransScript: HTMLScriptElement;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private midtransService: MidtransService
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

  ngOnInit() {
    this.midtransInit();
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

  midtransInit() {
    const clientKey = environments.MIDTRANS_CLIENT_KEY;
    this.midtransScript = document.createElement('script');
    this.midtransScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    this.midtransScript.setAttribute('data-client-key', clientKey);
    this.midtransScript.async = true;
    document.body.appendChild(this.midtransScript);

    return () => {
      document.body.removeChild(this.midtransScript);
    };
  }

  processPaymentDirect() {
    if (this.checkOutDataForm.valid && this.product && this.product.price) {
      const amountPeopleValue = this.amountPeople.value;
      const totalPrice = +this.product.price * +amountPeopleValue;

      const data = {
        name: this.product?.name,
        price: totalPrice,
        quantity: amountPeopleValue,
        order_id: ~~(Math.random() * 100) + 1,
      };

      this.midtransService.createPaymentToken(data).subscribe({
        next: (token) => {
          console.log(token);
          // Still developing
        },
        error(err) {
          console.error(err);
        },
      });
    }
  }

  // processPayment() {
  //   if (this.checkOutDataForm.valid && this.product && this.product.price) {
  //     const dateValue = this.date.value;
  //     const amountPeopleValue = this.amountPeople.value;
  //     const totalPrice = +this.product.price * +amountPeopleValue;

  //     Swal.fire({
  //       icon: 'question',
  //       title: 'Confirm your order before making payment..',
  //       showCancelButton: true,
  //       html: `
  //         <p>Schedule Date: ${dateValue}</p>
  //         <p>Amount of People: ${amountPeopleValue}</p>
  //         <p>Total Price: MYR ${totalPrice}</p>
  //       `,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const data = {
  //           name: this.product?.name,
  //           price: totalPrice,
  //           quantity: amountPeopleValue,
  //           order_id: ~~(Math.random() * 100) + 1,
  //         };

  //         this.midtransService.createPaymentToken(data).subscribe({
  //           next: (token) => {
  //             console.log(token);
  //           },
  //           error(err) {
  //             console.error(err);
  //           },
  //         });

  //         // Swal.fire(
  //         //   'Redirecting..',
  //         //   'You will be navigate to the Midtrans Payment Gateway to complete your order..',
  //         //   'info'
  //         // );
  //       } else {
  //         Swal.fire('Okay, action canceled!', '', 'info');
  //       }
  //     });
  //   }
  // }
}
