import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8000/api/users';
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshUsers() {
    this.httpClient.get<User[]>(`${this.url}`).subscribe((users) => {
      this.users$.next(users);
    });
  }

  getUsers(): Subject<User[]> {
    this.refreshUsers();
    return this.users$;
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}`, user, {
      responseType: 'text',
    });
  }

  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, user, {
      responseType: 'text',
    });
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, {
      responseType: 'text',
    });
  }
}
