import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private initialized = false;

  constructor() {
    // Don't initialize immediately - wait for first method call
  }

  private ensureInitialized() {
    if (!this.initialized && isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
      this.initialized = true;
    }
  }

  login(username: string, password: string): Observable<any> {
    this.ensureInitialized();
    return this.http.post<any>('http://localhost:3000/auth/login', { username, password })
      .pipe(
        tap(response => {
          console.log('AuthService - Login response:', response);
          if (response && response.token && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            if (response.user) {
              localStorage.setItem('currentUser', JSON.stringify(response.user));
              this.currentUserSubject.next(response.user);
            }
          }
        })
      );
  }

  logout() {
    this.ensureInitialized();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    this.ensureInitialized();
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    this.ensureInitialized();
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUserRole(): string {
    this.ensureInitialized();
    const user = this.getCurrentUser();
    return user?.role || '';
  }

  getUserId(): string {
    this.ensureInitialized();
    const user = this.getCurrentUser();
    return user?._id || '';
  }
}