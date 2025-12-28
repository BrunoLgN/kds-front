// src/app/services/login.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { KeycloakService } from 'keycloak-angular'; // 💡 Importe o KeycloakService

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  // Não precisamos mais da API de login, pois o Keycloak a gerencia.
  // Mantemos a API base para as chamadas autenticadas:
  API_BASE = environment.SERVIDOR;

  keycloakService = inject(KeycloakService); // 💡 Injete o KeycloakService

  constructor() {}

  // ❌ REMOVER: logar()
  // O login será iniciado pelo KeycloakService na inicialização do app.

  // ❌ REMOVER: addToken(), removerToken(), getToken()
  // O Keycloak gerencia o armazenamento e a remoção.

  // ❌ REMOVER: jwtDecode()
  // Use métodos nativos do Keycloak.

  async hasRole(role: string): Promise<boolean> {
    // 💡 Usa o método nativo do Keycloak para verificar a role.
    return this.keycloakService.isUserInRole(role);
  }

  logout() {
    // 💡 Usa o método nativo do Keycloak para fazer logout.
    this.keycloakService.logout(window.location.origin);
  }

  // Exemplo de chamada autenticada (O Keycloak adicionará o token automaticamente!)
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.API_BASE}/api/usuario/findAll`);
  }
}