import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFloatUiModule } from 'ngx-float-ui';

// ❌ REMOVIDO temporariamente
// import { KeycloakService, KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakAuthGuard } from 'keycloak-angular';
// import { initializeKeycloak } from './core/keycloak-init.service'; 
// import { keycloakTokenInterceptor } from './auth/keycloak-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(), // 🚀 sem interceptores POR ENQUANTO
    provideAnimationsAsync(),

    // 📌 Mantemos módulos auxiliares normalmente
    importProvidersFrom(
      TranslateModule.forRoot(),
      NgxFloatUiModule
    ),

    // ❌ REMOVIDO Keycloak init
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService],
    // },
  ]
};
