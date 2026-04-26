import { NextResponse } from 'next/server';
import { getAllArticles, createArticle } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  const articles = getAllArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  const data = await request.json();
  
  if (!data.slug || !data.title || !data.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  
  const id = createArticle({
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt || null,
    content: data.content,
    featured_image: data.featured_image || null,
    published: !!data.published
  });
  
  return NextResponse.json({ id, message: 'Article created' });
}