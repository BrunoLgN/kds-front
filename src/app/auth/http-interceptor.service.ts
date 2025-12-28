// src/app/interceptors/meu-http.interceptor.ts

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

 


  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {

        if (err.status === 403) {
          alert('403 - Acesso Negado. Você não possui a permissão necessária.');
          // Redireciona para uma página de acesso negado, não para o login!
          router.navigate(['/acesso-negado']); 
        } else if (err.status !== 401) { 
          // 401 é geralmente tratado pelo próprio KeycloakService
          console.error(`HTTP Error ${err.status}:`, err);
        }
      } else {
        console.error('An unexpected error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};