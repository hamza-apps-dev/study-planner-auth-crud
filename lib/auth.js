import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_student_planner_2026_secure_key';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export const AUTH_COOKIE_NAME = 'auth_token';

/**
 * Signs a JWT with user payload using HS256 algorithm.
 * Compatible with Edge & Node.js runtimes.
 */
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

/**
 * Verifies a JWT token and returns decoded payload.
 * Returns null if invalid or expired.
 */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Cookie options for setting HTTP-only session cookies
 */
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

/**
 * Helper to extract and verify authenticated user from Next.js Request
 */
export async function getUserFromRequest(request) {
  // Check cookie first
  let token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  // Fallback to Authorization Header if present
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;
  return await verifyToken(token);
}
