import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  public rootUrl!: string;

  constructor(private http: HttpClient) {
    this.rootUrl = 'http://localhost:3000';
  }

  get<T>(url: string) {
    return this.http.get<T>(`${this.rootUrl}/${url}`);
  }

  post(url: string, payload: Object) {
    return this.http.post(`${this.rootUrl}/${url}`, payload);
  }

  patch(url: string, payload: Object) {
    return this.http.patch(`${this.rootUrl}/${url}`, payload);
  }

  delete(url: string) {
    return this.http.delete(`${this.rootUrl}/${url}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.rootUrl}/users/login`, {
      email, password
    }, { observe: 'response' });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.rootUrl}/users`, {
      email,
      password
    }, {
      observe: 'response'
    });
  }
}
