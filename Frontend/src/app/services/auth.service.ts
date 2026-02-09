import { Injectable, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
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

  constructor() {
    // Initialize from localStorage during construction (browser only)
    if (isPlatformBrowser(this.platformId)) {
      this.initializeFromLocalStorage();
    }

    // Also initialize after client-side hydration (handles SSR case)
    afterNextRender(() => {
      this.initializeFromLocalStorage();
    });
  }

  private initializeFromLocalStorage() {
    try {
      const user = localStorage.getItem('currentUser');
      if (user && !this.currentUserSubject.value) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    } catch (e) {
      console.error('Error initializing from localStorage:', e);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', { username, password })
      .pipe(
        tap(response => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
          }
          if (response?.user) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return true;
  }

  getUserRole(): string {
    if (this.currentUserSubject.value?.role) {
      return this.currentUserSubject.value.role;
    }

    // Fallback to localStorage for page refresh scenarios
    // Only access localStorage in browser context (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      try {
        const user = localStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          // Also update the BehaviorSubject so it's in sync
          if (!this.currentUserSubject.value) {
            this.currentUserSubject.next(parsedUser);
          }
          return parsedUser.role || '';
        }
      } catch (e) {
        console.error('Error accessing localStorage:', e);
      }
    }

    return '';
  }

  getUserId(): string {
    if (this.currentUserSubject.value?._id) {
      return this.currentUserSubject.value._id;
    }

    // Fallback to localStorage for page refresh scenarios
    // Only access localStorage in browser context (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      try {
        const user = localStorage.getItem('currentUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          // Also update the BehaviorSubject so it's in sync
          if (!this.currentUserSubject.value) {
            this.currentUserSubject.next(parsedUser);
          }
          return parsedUser._id || '';
        }
      } catch (e) {
        console.error('Error accessing localStorage in getUserId:', e);
      }
    }

    return '';
  }
}
