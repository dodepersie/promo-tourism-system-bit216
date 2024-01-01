import { Injectable } from '@angular/core';
import { Merchant, getTopProduct } from '../merchant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MinistryService {
  private url = 'http://localhost:8000/api/ministry';

  constructor(private httpClient: HttpClient) {}

  getMerchantProductAnalytics(id: string | null) {
    return this.httpClient.get<getTopProduct[]>(`
    ${this.url}/merchant/top_products?merchant_id=${id ? id : ''}`);
  }
}
