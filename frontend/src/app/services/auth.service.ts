import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  webService: any;

  constructor(private webRequestService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res);

        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');
        const userId = res.body._id;

        if (accessToken && refreshToken) {
          this.setSession(userId, accessToken, refreshToken);
          console.log("Logged in!");
        } else {
          console.error("Login failed: Missing tokens");
        }
      })
    );
  }

  signup(email: string, password: string) {
    return this.webRequestService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res);

        const accessToken = res.headers.get('x-access-token');
        const refreshToken = res.headers.get('x-refresh-token');
        const userId = res.body._id;

        if (accessToken && refreshToken) {
          this.setSession(userId, accessToken, refreshToken);
          console.log("Successfully Signed up and Logged in!");
        } else {
          console.error("Login failed: Missing tokens");
        }
      })
    );
  }


  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }
  logout() {
    console.log("Logged out");
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getrefreshToken(refreshToken: string) {
    localStorage.setItem('x-refresh-token', refreshToken);
  }
  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }
  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }
  getRefreshToken() {
    let refreshToken = localStorage.getItem('x-refresh-token') as string;
    return refreshToken;
  }
  getUserId() {
    let user_id = localStorage.getItem('user-id') as string;
    return user_id;
  }
  public removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webRequestService.rootUrl}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res);

        const accessToken = res.headers.get('x-access-token');
        if (accessToken) {
          return this.setAccessToken(accessToken);
        }
      })
    )
  }


}
