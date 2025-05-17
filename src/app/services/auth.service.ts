import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string; // ou 'id' dependendo do backend
  nome?: string;
  id: string;
  roles?: string[];
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Token inválido:', error);
      }
    }
    return null;
  }

  getUsuarioId(): number {
    const payload = this.decodeToken();
    if (payload && payload.id) {
      return +payload.id;
    }
    throw new Error('Usuário não autenticado ou token inválido');
  }
  
  

  getUsuarioNome(): string | null {
    const payload = this.decodeToken();
    return payload?.nome ?? null;
  }

  isAutenticado(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
