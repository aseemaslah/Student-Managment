import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private platformId = inject(PLATFORM_ID);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }

    console.log('Auth Interceptor - Token:', token ? 'Present' : 'Missing');
    console.log('Auth Interceptor - Request URL:', req.url);

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log('Auth Interceptor - Added Authorization header');
      return next.handle(cloned);
    } else {
      console.log('Auth Interceptor - No token, sending request without auth');
      return next.handle(req);
    }
  }
}
