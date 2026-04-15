import { createRemoteJWKSet, jwtVerify } from "jose";

const keycloakBaseUrl =
  process.env.KEYCLOAK_BASE_URL || "http://localhost:8080";
const keycloakRealm = process.env.KEYCLOAK_REALM || "book-store";
const frontendClientId =
  process.env.KEYCLOAK_FRONTEND_CLIENT_ID || "book-store-frontend";

const issuer = `${keycloakBaseUrl}/realms/${keycloakRealm}`;
const jwks = createRemoteJWKSet(new URL(`${issuer}/protocol/openid-connect/certs`));

function extractBearerToken(header = "") {
  if (!header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length).trim();
}

function getRealmRoles(payload) {
  return payload?.realm_access?.roles || [];
}

export async function requireAuth(req, res, next) {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer,
    });

    const tokenClientId = payload.azp || payload.client_id;
    if (tokenClientId !== frontendClientId) {
      return res.status(401).json({ message: "Token client is not allowed" });
    }

    req.auth = {
      token,
      sub: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      name: payload.name,
      roles: getRealmRoles(payload),
      payload,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      details: error.message,
    });
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const roles = req.auth?.roles || [];
    const isAllowed = allowedRoles.some((role) => roles.includes(role));

    if (!isAllowed) {
      return res.status(403).json({
        message: `Requires one of these roles: ${allowedRoles.join(", ")}`,
      });
    }

    return next();
  };
}
