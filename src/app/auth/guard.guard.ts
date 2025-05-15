import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // Lista de URLs protegidas apenas para ROLE_ADMIN
const adminProtectedRoutes = [
  '/admin/rankings',
  '/admin/cadastroUsuario',
  '/admin/cadastroUsuario/',
  '/admin/cidades',
  '/admin/cadastroConsole',
  '/admin/cadastroConsole/',
  '/admin/cadastroCidade',
  '/admin/cadastroCidade/',
  '/admin/cadastroRanking',
  '/admin/cadastroRanking/'
];

// Verifica se a URL corresponde a alguma das rotas protegidas
const isProtectedRoute = adminProtectedRoutes.some(route => state.url.startsWith(route));

if (isProtectedRoute && !loginService.hasPermission('ROLE_ADMIN')) {
  alert('Você não tem permissão para acessar esta página.');
  router.navigate(['/admin/dashboard']);
  return false;
}

return true;

};
