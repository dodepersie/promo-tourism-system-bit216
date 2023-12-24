import { Injectable } from '@angular/core';
import { PostOrder, getInvoice, getInvoiceOrders, Invoice, InvoiceDB } from '../payment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  private url = 'http://localhost:8000/api/payment';

  constructor(private httpClient: HttpClient) {}

  createInvoice(order: PostOrder) {
    return this.httpClient.post<getInvoice>(`${this.url}/invoice`, order);
  }

  createInvoicePay(invoice_id: string) {
    return this.httpClient.post<getInvoice>(
      `${this.url}/invoice/${invoice_id}/pay`,
      { }
    );
  }

  getPaymentStatus(invoice_id: string) {
    return this.httpClient.get(`${this.url}/invoice/${invoice_id}`);
  }

  getPaymentCapture(invoice_id: string) {
    return `${this.url}/invoice/${invoice_id}/capture`;
  }

  getInvoiceById(invoice_id: string) {
    return this.httpClient.get<getInvoiceOrders>(
      `${this.url}/invoice/${invoice_id}`
    );
  }

  getUserOrder(invoice_id: string): Observable<InvoiceDB> {
    return this.httpClient.get<InvoiceDB>(`${this.url}/user/${invoice_id}`);
  }

  // getProductDetail(id: string): Observable<getMerchantOrders> {
  //   return this.httpClient.get<getMerchantOrders>(`${this.url}/`)
  // }
}
