import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MidtransService {

  private url = 'http://localhost:8000/api/midtrans';

  constructor(private httpClient: HttpClient) { }

  createPaymentToken(product: Product): Observable<string> {
    return this.httpClient.post(`${this.url}/get-token`, product, {
      responseType: 'text',
    });
  }
}
