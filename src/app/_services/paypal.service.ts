import { Injectable } from '@angular/core';
import {
  PostOrder,
  getInvoice,
  getInvoiceOrders,
  InvoiceDB
} from '../payment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../product';

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
      {}
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

  getInvoiceDBById(invoice_id: string) {
    return this.httpClient.get<InvoiceDB>(
      `${this.url}/invoice-db/${invoice_id}`
    );
  }

  getUserOrder(invoice_id: string): Observable<InvoiceDB> {
    return this.httpClient.get<InvoiceDB>(`${this.url}/user/${invoice_id}`);
  }

  getProductDetail(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/product/${id}`);
  }

  // getProductDetail(productId: string): Observable<Product[]> {
  //   const url = `${this.url}/product/${productId}`;

  //   return this.httpClient.get<Product[]>(url).pipe(
  //     map((products: Product[]) => {
  //       return products.map(product => {
  //         const productData = Array.isArray(product.user) && product.user.length > 0 ? product.user[0] : null;          return {
  //           ...product,
  //           productData
  //         };
  //       });
  //     })
  //   );
  // }
}
