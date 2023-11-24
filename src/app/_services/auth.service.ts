import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/api/auth';
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  loginService(loginObj: any) {
    return this.httpClient.post(`${this.url}/login`, loginObj, {
      responseType: 'text',
    });
  }

  changeMerchantPassword(id: string, newPassword: string): Observable<string> {
    const updatePassword = { password: newPassword };

    return this.httpClient.post(
      `${this.url}/change-merchant-password/${id}`,
      updatePassword,
      { responseType: 'text' }
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('user_id');
  }
}
