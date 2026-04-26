import { NextResponse } from 'next/server';
import { getArticleById, updateArticle, deleteArticle } from '@/lib/articles';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  const { id } = await params;
  const article = getArticleById(parseInt(id));
  
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  
  return NextResponse.json(article);
}

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  const { id } = await params;
  const data = await request.json();
  
  updateArticle(parseInt(id), data);
  
  return NextResponse.json({ message: 'Article updated' });
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  const { id } = await params;
  deleteArticle(parseInt(id));
  
  return NextResponse.json({ message: 'Article deleted' });
}