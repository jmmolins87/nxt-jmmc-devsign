import { SignJWT, jwtVerify } from 'jose';
import { getUserByUsername, createUser } from './articles';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
);

export async function hashPassword(password: string): Promise<string> {
  const msg = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msg);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function createToken(userId: number, username: string): Promise<string> {
  return new SignJWT({ userId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ userId: number; username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: number; username: string };
  } catch {
    return null;
  }
}

export function initDefaultUser() {
  const existingUser = getUserByUsername('admin');
  if (!existingUser) {
    hashPassword('admin123').then(hash => {
      createUser('admin', hash);
      console.log('Default admin user created (admin/admin123)');
    });
  }
}