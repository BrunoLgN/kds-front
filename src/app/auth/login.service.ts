// src/app/services/login.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
// ❌ import { KeycloakService } from 'keycloak-angular'; // REMOVIDO

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API_BASE = environment.SERVIDOR;

  // 🚫 Removido: KeycloakService
  // keycloakService = inject(KeycloakService);

  constructor() {}

  // 🚫 REMOVIDO - não será usado agora
  /*
  async hasRole(role: string): Promise<boolean> {
    return this.keycloakService.isUserInRole(role);
  }
  */

  // 🚫 REMOVIDO
  /*
  logout() {
    this.keycloakService.logout(window.location.origin);
  }
  */

  // 📌 Continua funcionando normalmente
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.API_BASE}/api/usuario/findAll`);
  }
}
