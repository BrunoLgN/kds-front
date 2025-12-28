
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFloatUiModule } from 'ngx-float-ui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// 💡 Keycloak Imports
import { KeycloakService, KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakAuthGuard } from 'keycloak-angular';
// Ajuste o caminho de importação conforme a localização do seu arquivo initializeKeycloak
import { initializeKeycloak } from './core/keycloak-init.service'; 
import { keycloakTokenInterceptor } from './auth/keycloak-token.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    
    
    // ⚠️ ATENÇÃO: Remoção do withInterceptors([meuhttpInterceptor])
    // O Keycloak Angular injetará seu próprio interceptor automaticamente.
    provideHttpClient(      withInterceptors([keycloakTokenInterceptor])
), 
    
    provideAnimationsAsync(),
    
    // 💡 PROVIDER DO KEYCLOAK
    // 1. Fornece o serviço Keycloak na raiz da aplicação
      importProvidersFrom(
      KeycloakAngularModule, // 👈 Adicione o módulo aqui
      TranslateModule.forRoot(),
      NgxFloatUiModule,
    ),

    // 2. Configura a inicialização do Keycloak antes do bootstrap do Angular
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    
    
   
  ]
};



