import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../product';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:8000/api/products';
  private products$: Subject<Product[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshProducts() {
    this.httpClient.get<Product[]>(`${this.url}`).subscribe((products) => {
      this.products$.next(products);
    });
  }

  getProducts(): Subject<Product[]> {
    this.refreshProducts();
    return this.products$;
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }

  getProductByMerchantId(id: string): Observable<Product []> {
    return this.httpClient.get<Product []>(`${this.url}/get/${id}`);
  }

  createProduct(product: Product): Observable<string> {
    return this.httpClient.post(`${this.url}`, product, {
      responseType: 'text',
    });
  }

  editProduct(id: string, product: Product): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, product, {
      responseType: 'text',
    });
  }

  deleteProduct(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }
}
