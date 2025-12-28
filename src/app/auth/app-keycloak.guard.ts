import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root' // 👈 Agora o Angular sabe injetar
})
export class AppKeycloakGuard extends KeycloakAuthGuard {
  constructor(
    protected override router: Router,              // ✅ agora inclui o Router
    protected override keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);                 // ✅ passa os dois argumentos
  }

  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // 🔐 Se o usuário não estiver autenticado, redireciona para o login
    if (!this.authenticated) {
      await this.keycloakAngular.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }

    // 🔑 Se a rota tiver roles exigidas:
    const requiredRoles = route.data['roles'];
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 🔎 Verifica se o usuário possui pelo menos uma role exigida
    return requiredRoles.some((role: string) =>
      this.roles.includes(role)
    );
  }
}
