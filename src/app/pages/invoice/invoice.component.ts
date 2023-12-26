import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from 'src/app/_services/paypal.service';
import { getInvoiceOrders } from 'src/app/payment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceData: getInvoiceOrders | null = null;
  yearNow: Number = new Date().getFullYear()

  constructor(
    private paypalService: PaypalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.paypalService.getInvoiceById(productId).subscribe({
          next: (invoiceData: getInvoiceOrders) => {
            this.invoiceData = invoiceData;
          },
          error: (error) => {
            console.error('Error fetching invoice data:', error);
          },
        });
      } else {
        console.error('Product ID is not found in URL');
      }
    });
  }
}
