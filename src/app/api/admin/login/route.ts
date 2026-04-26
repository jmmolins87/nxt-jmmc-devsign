import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/articles';
import { verifyPassword, createToken, initDefaultUser } from '@/lib/auth';

export async function POST(request: Request) {
  initDefaultUser();
  
  const { username, password } = await request.json();
  
  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }
  
  const user = getUserByUsername(username);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  const token = await createToken(user.id, user.username);
  
  return NextResponse.json({ token, username: user.username });
}