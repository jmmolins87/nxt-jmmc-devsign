import { NextResponse } from 'next/server';
import { getPublishedArticles } from '@/lib/articles';

export async function GET() {
  const articles = getPublishedArticles();
  return NextResponse.json(articles);
}