import Link from 'next/link';
import { getPublishedArticles } from '@/lib/articles';
import './blog.css';

export default function BlogPage() {
  const articles = getPublishedArticles();

  return (
    <main className="min-h-screen py-24 px-4 max-w-4xl mx-auto">
      <h1 className="text-6xl font-bold mb-16">Blog</h1>
      
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.id} className="blog-card">
            <Link href={`/blog/${article.slug}`}>
              <span className="text-sm text-text-muted">
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <h2 className="text-3xl font-bold mt-2">{article.title}</h2>
              <p className="text-text-muted mt-2">{article.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
      
      {articles.length === 0 && (
        <p className="text-text-muted">No articles yet. Check back soon!</p>
      )}
    </main>
  );
}