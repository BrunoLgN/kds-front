/*
  import { HttpInterceptorFn } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { KeycloakService } from 'keycloak-angular';

  export const keycloakTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const keycloakService = inject(KeycloakService);

    if (keycloakService.isLoggedIn()) {
      const token = keycloakService.getKeycloakInstance().token;
      if (token && req.url.includes('/api/')) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('✅ Token adicionado à requisição:', req.url);
        return next(authReq);
      }
    }

    console.log('❌ Token NÃO adicionado:', req.url);
    return next(req);
  };
*/