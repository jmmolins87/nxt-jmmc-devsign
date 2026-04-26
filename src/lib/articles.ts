import fs from 'fs';
import path from 'path';

interface Article {
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

interface Database {
  articles: Article[];
  users: { id: number; username: string; password_hash: string }[];
}

const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'portfolio.json');

function readDb(): Database {
  if (!fs.existsSync(dbPath)) {
    return { articles: [], users: [] };
  }
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDb(data: Database): void {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getPublishedArticles(): Article[] {
  const db = readDb();
  return db.articles
    .filter(a => a.published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const db = readDb();
  return db.articles.find(a => a.slug === slug && a.published);
}

export function getAllArticles(): Article[] {
  const db = readDb();
  return db.articles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getArticleById(id: number): Article | undefined {
  const db = readDb();
  return db.articles.find(a => a.id === id);
}

export function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): number {
  const db = readDb();
  const maxId = db.articles.length > 0 ? Math.max(...db.articles.map(a => a.id)) : 0;
  const newId = maxId + 1;
  const now = new Date().toISOString();
  
  db.articles.push({
    ...article,
    id: newId,
    created_at: now,
    updated_at: now
  });
  
  writeDb(db);
  return newId;
}

export function updateArticle(id: number, update: Partial<Article>): void {
  const db = readDb();
  const index = db.articles.findIndex(a => a.id === id);
  
  if (index !== -1) {
    db.articles[index] = {
      ...db.articles[index],
      ...update,
      updated_at: new Date().toISOString()
    };
    writeDb(db);
  }
}

export function deleteArticle(id: number): void {
  const db = readDb();
  db.articles = db.articles.filter(a => a.id !== id);
  writeDb(db);
}

export function createUser(username: string, passwordHash: string): void {
  const db = readDb();
  if (!db.users.find(u => u.username === username)) {
    db.users.push({
      id: db.users.length + 1,
      username,
      password_hash: passwordHash
    });
    writeDb(db);
  }
}

export function getUserByUsername(username: string): { id: number; username: string; password_hash: string } | undefined {
  const db = readDb();
  return db.users.find(u => u.username === username);
}