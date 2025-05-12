import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const url = state.url;

  // Protege rota de rankings apenas para ROLE_ADMIN
  if (url.startsWith('/admin/rankings') && !loginService.hasPermission('ROLE_ADMIN')) {
    alert('Você não tem permissão para acessar esta página.');
    router.navigate(['/admin/dashboard']);
    return false;
  }

  return true;
};
