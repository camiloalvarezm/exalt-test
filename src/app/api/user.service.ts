import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://my-json-server.typicode.com/camiloalvarezm/store-api';

  constructor(private http: HttpClient) {}

  getClientUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/client-users`);
  }

  getAdminUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin-users`);
  }

}
