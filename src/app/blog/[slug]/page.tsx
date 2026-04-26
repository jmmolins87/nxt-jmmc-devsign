import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/articles';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

const getArticle = cache(getArticleBySlug);

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  
  if (!article) {
    notFound();
  }

  const processedContent = await remark()
    .use(html)
    .process(article.content);
  
  const contentHtml = processedContent.toString();

  return (
    <article className="min-h-screen py-24 px-4 max-w-3xl mx-auto">
      <header className="mb-12">
        <time className="text-sm text-text-muted">
          {new Date(article.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        <h1 className="text-5xl font-bold mt-4">{article.title}</h1>
        {article.excerpt && (
          <p className="text-xl text-text-muted mt-4">{article.excerpt}</p>
        )}
      </header>
      
      <div 
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}