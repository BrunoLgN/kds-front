/*export const environment = {
SERVIDOR: "https://api.kds.com.br"

};
*/

export const environment = {
  production: true,
  SERVIDOR: "https://api.kds.com.br",       // sua API pública
  APP_URL: "https://app.kds.com.br",
  KEYCLOAK_URL: "https://auth.kds.com.br",  // sem porta
  KEYCLOAK_REALM: "kds",
  KEYCLOAK_CLIENT_ID: "kdsadmin"
};
