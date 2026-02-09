import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // During SSR, allow access and let client-side handle auth
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!authService.isLoggedIn()) {
    router.navigate(['/main']);
    return false;
  }

  const expectedRoles = route.data?.['roles'] as Array<string>;
  const userRole = authService.getUserRole();

  if (expectedRoles && expectedRoles.length > 0) {
    if (!expectedRoles.includes(userRole)) {
      if (userRole === 'Admin') {
        router.navigate(['/admin']);
      } else if (userRole === 'Teacher') {
        router.navigate(['/teacher']);
      } else if (userRole === 'Student') {
        router.navigate(['/student']);
      } else {
        router.navigate(['/main']);
      }
      return false;
    }
  }

  return true;
};
