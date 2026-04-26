import db from './db';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function getPublishedArticles(): Article[] {
  return db.prepare('SELECT * FROM articles WHERE published = 1 ORDER BY created_at DESC').all() as Article[];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return db.prepare('SELECT * FROM articles WHERE slug = ? AND published = 1').get(slug) as Article | undefined;
}

export function getAllArticles(): Article[] {
  return db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all() as Article[];
}

export function getArticleById(id: number): Article | undefined {
  return db.prepare('SELECT * FROM articles WHERE id = ?').get(id) as Article | undefined;
}

export function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): number {
  const stmt = db.prepare(`
    INSERT INTO articles (slug, title, excerpt, content, featured_image, published)
    VALUES (@slug, @title, @excerpt, @content, @featured_image, @published)
  `);
  const result = stmt.run(article);
  return result.lastInsertRowid as number;
}

export function updateArticle(id: number, article: Partial<Article>): void {
  const fields = Object.keys(article).filter(k => k !== 'id').map(k => `${k} = @${k}`).join(', ');
  db.prepare(`UPDATE articles SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = @id`).run({ ...article, id });
}

export function deleteArticle(id: number): void {
  db.prepare('DELETE FROM articles WHERE id = ?').run(id);
}

export function createUser(username: string, passwordHash: string): void {
  db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash);
}

export function getUserByUsername(username: string): { id: number; username: string; password_hash: string } | undefined {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
}