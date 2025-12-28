/*
  import { KeycloakService } from 'keycloak-angular';

  export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'https://auth.kds.com.br:5001',
          realm: 'kds',
          clientId: 'kdsadmin',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
          pkceMethod: 'S256'
        },
        // 🔥 CONFIGURAÇÃO CRÍTICA PARA O INTERCEPTOR
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: [
          '/assets',
          '/*.css',
          '/*.js',
          '/favicon.ico'
        ]
      });
  }*/

      import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';
      

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,   // https://auth.kds.com.br
        realm: environment.KEYCLOAK_REALM,
        clientId: environment.KEYCLOAK_CLIENT_ID,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        pkceMethod: 'S256'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: [
        '/assets',
        '/*.css',
        '/*.js',
        '/favicon.ico'
      ]
    });
}
