import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Merchant } from '../merchant';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private url = 'http://localhost:8000/api/merchants';
  private merchants$: Subject<Merchant[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  createMerchant(merchant: Merchant): Observable<string> {
    return this.httpClient.post(`${this.url}`, merchant, {
      responseType: 'text',
    });
  }

  getMerchant(id: string): Observable<Merchant> {
    return this.httpClient.get<Merchant>(`${this.url}/${id}`);
  }
}
