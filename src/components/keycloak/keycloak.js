/**
 * Keycloak Client Component
 * Creates a Keycloak client using keycloak-js and the url, realm and clientId
 * from the .env files.
 */

import Keycloak from "keycloak-js"

/**
 * Stores Keycloak configuration strings from the appropriate .env process file.
 */
const keycloakConfig = {
  url: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENTID,
}

/**
 * Create a new Keycloak client using the config from above and export it.
 */
const keycloak = new Keycloak(keycloakConfig)

export default keycloak
