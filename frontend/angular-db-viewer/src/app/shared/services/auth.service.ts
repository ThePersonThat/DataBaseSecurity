import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponse, ChangePassword, User} from "../interfaces/Auth";
import {API_HOST} from "../interfaces/Http";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<any> {
    return this.http.post<AuthResponse>(API_HOST + 'login', user).pipe(
      tap(response => this.createSession(response))
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_HOST + 'register', user);
  }

  changePassword(changeData: ChangePassword): Observable<any> {
    return this.http.post(API_HOST + 'change', changeData);
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getJwtToken();
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/auth/login']);
  }

  private createSession(response: AuthResponse): void {
    localStorage.setItem(this.JWT_TOKEN, response.token);
  }
}
