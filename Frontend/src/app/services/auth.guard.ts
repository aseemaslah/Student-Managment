import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

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

