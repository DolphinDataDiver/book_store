import { createRemoteJWKSet, jwtVerify } from "jose";

const KEYCLOAK_URL = "http://localhost:8080";
const REALM = "bookstore-realm";

const jwks = createRemoteJWKSet(
  new URL(`${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/certs`)
);

export async function requireKeycloakAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    const { payload } = await jwtVerify(token, jwks, {
      issuer: `${KEYCLOAK_URL}/realms/${REALM}`,
    });

    req.user = payload; // contient aussi realm_access.roles
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
