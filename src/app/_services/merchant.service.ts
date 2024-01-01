import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Merchant, getTopProduct } from '../merchant';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private url = 'http://localhost:8000/api/merchants';
  private merchants$: Subject<Merchant[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshMerchants() {
    this.httpClient.get<Merchant[]>(`${this.url}`).subscribe((merchants) => {
      this.merchants$.next(merchants);
    });
  }

  getMerchants(): Subject<Merchant[]> {
    this.refreshMerchants();
    return this.merchants$;
  }

  createMerchant(merchant: Merchant): Observable<string> {
    return this.httpClient.post(`${this.url}`, merchant, {
      responseType: 'text',
    });
  }

  getMerchant(id: string): Observable<Merchant> {
    return this.httpClient.get<Merchant>(`${this.url}/${id}`);
  }

  updateMerchantStatus(id: string, newStatus: string): Observable<string> {
    const updateData = { status: newStatus };

    return this.httpClient.put(`${this.url}/status/${id}`, updateData, {
      responseType: 'text',
    });
  }

  updateMerchantIsFirstLogin(
    id: string,
    setIsFirstLogin: boolean
  ): Observable<any> {
    const updateData = { isFirstLogin: setIsFirstLogin };

    return this.httpClient.put(`${this.url}/check-login/${id}`, updateData, {
      responseType: 'text',
    });
  }

  getProductAnalytics(id: string | null) {
    return this.httpClient.get<getTopProduct[]>(`
    ${this.url}/top_products/${id}`);
  }
}
