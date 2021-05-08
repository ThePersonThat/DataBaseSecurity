import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponse, User} from "../interfaces/Auth";
import {API_HOST} from "../interfaces/Http";
import {catchError, map, mapTo, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<boolean> {
    return this.http.post<AuthResponse>(API_HOST + 'login', user).pipe(
      tap(response => this.createSession(response)),
      mapTo(true)
    );
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getJwtToken();
  }

  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    this.router.navigate(['/login']);
  }

  private createSession(response: AuthResponse): void {
    localStorage.setItem(this.JWT_TOKEN, response.token);
  }
}
