import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(ToastrService);

  const token = sessionStorage.getItem('token');
  if (!token) {
    toast.error('Access Denied!!', '');
    router.navigate(['login']);

    return false;
  }
  return true;
};
