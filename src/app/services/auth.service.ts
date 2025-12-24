import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private api = environment.API_URL;

  constructor() {}

  login(data: any) {
    return this.httpClient.post<any>(
      `http://localhost:3000/api/auth/login`,
      data
    );
  }
}
