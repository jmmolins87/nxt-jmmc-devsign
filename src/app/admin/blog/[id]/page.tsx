'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditArticle() {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch(`/api/admin/articles/${params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(article => {
        setTitle(article.title || '');
        setSlug(article.slug || '');
        setExcerpt(article.excerpt || '');
        setContent(article.content || '');
        setPublished(article.published || false);
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin');
      });
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    
    await fetch(`/api/admin/articles/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ slug, title, excerpt, content, published })
    });
    
    router.push('/admin');
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setSlug(generateSlug(e.target.value));
            }}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange-500 outline-none h-24"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Content (Markdown)</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange-500 outline-none h-64 font-mono"
            required
          />
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="w-5 h-5"
          />
          <label htmlFor="published">Published</label>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
        >
          Update Article
        </button>
      </form>
    </main>
  );
}