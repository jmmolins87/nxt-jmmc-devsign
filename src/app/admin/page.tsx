'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch('/api/admin/articles', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setArticles)
      .catch(() => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      });
  }, [router]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this article?')) return;
    
    const token = localStorage.getItem('admin_token');
    await fetch(`/api/admin/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    setArticles(articles.filter(a => a.id !== id));
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded"
        >
          New Article
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map(article => (
          <div
            key={article.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-sm text-text-muted">
                {article.slug} • {article.published ? 'Published' : 'Draft'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/blog/${article.id}`}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(article.id)}
                className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}