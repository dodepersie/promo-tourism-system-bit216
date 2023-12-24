import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { LoginToken } from '../login-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/api/auth';
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  setSession(authResult: LoginToken) {
    const expiresIn = moment().add(authResult.expiresIn, "second")
    localStorage.setItem("token", authResult.token)
    localStorage.setItem("expiresIn", JSON.stringify(expiresIn.valueOf()))
  }

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

  getExpiration() {
    const expiration = localStorage.getItem("expiresIn")
    if (expiration) {
      const expiresIn = JSON.parse(expiration)
      return moment(expiresIn)
    } else {
      return null
    }
  }
}
