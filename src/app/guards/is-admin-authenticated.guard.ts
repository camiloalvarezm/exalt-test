import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAdminAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('token') && localStorage.getItem('role') == '1') {
    return true;
  }
  if (localStorage.getItem('token')) {
    router.navigateByUrl('/client');
    return false;
  }
  router.navigateByUrl('/auth');
  return false;
};
