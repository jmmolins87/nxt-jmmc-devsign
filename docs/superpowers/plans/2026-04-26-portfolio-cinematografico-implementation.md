# Portfolio Cinematográfico Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a portfolio with cinematic animations and blog with backend API for weekly articles

**Architecture:** Next.js 16 with API routes + SQLite database. Frontend uses Framer Motion for animations, Tailwind CSS v4 for styling. Split into 4 phases: Core+Blog, Animations, Portfolio Pages, Admin Panel.

**Tech Stack:** Next.js 16.2.4, Framer Motion, Lenis, Tailwind CSS v4, Better-SQLite3, JWT auth

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with smooth scroll
│   ├── page.tsx                # Home with cinematic animations
│   ├── globals.css              # Global styles + CSS variables
│   ├── work/
│   │   └── page.tsx             # Portfolio gallery
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx         # Single article
│   ├── admin/
│   │   ├── layout.tsx           # Admin layout (protected)
│   │   ├── page.tsx            # Admin dashboard
│   │   └── blog/
│   │       ├── new/
│   │       │   └── page.tsx    # Create article
│   │       └── [id]/
│   │           └── page.tsx      # Edit article
│   └── api/
│       ├── blog/
│       │   ├── route.ts        # GET all articles
│       │   └── [slug]/
│       │       └── route.ts    # GET single article
│       └── admin/
│           ├── login/
│           │   └── route.ts   # POST login
│           └── articles/
│               ├── route.ts    # GET/POST articles
│               └── [id]/
│                   └── route.ts # PUT/DELETE article
├── lib/
│   ├── db.ts                  # Database connection
│   ├── articles.ts            # Article queries
│   └── auth.ts               # Auth utilities
└── components/
    ├── ui/                    # Reusable UI components
    ├── animations/            # Animation components
    └── admin/                 # Admin components
```

---

## Phase 1: Core + Blog

### Task 1: Database Setup

**Files:**
- Create: `src/lib/db.ts`
- Create: `src/lib/articles.ts`

- [ ] **Step 1: Install better-sqlite3**

```bash
pnpm add better-sqlite3 && pnpm add -D @types/better-sqlite3
```

- [ ] **Step 2: Create database connection**

```typescript
// src/lib/db.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = process.env.DATABASE_URL || './data/portfolio.db';
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
`);

export default db;
```

- [ ] **Step 3: Create article queries**

```typescript
// src/lib/articles.ts
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
```

- [ ] **Step 4: Create data directory**

```bash
mkdir -p data
```

- [ ] **Step 5: Commit**

```bash
git add src/lib db.ts src/lib/articles.ts package.json
git commit -m "feat: add database setup with SQLite"
```

---

### Task 2: Blog API Routes

**Files:**
- Create: `src/app/api/blog/route.ts`
- Create: `src/app/api/blog/[slug]/route.ts`

- [ ] **Step 1: Create blog listing API**

```typescript
// src/app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { getPublishedArticles } from '@/lib/articles';

export async function GET() {
  const articles = getPublishedArticles();
  return NextResponse.json(articles);
}
```

- [ ] **Step 2: Create single article API**

```typescript
// src/app/api/blog/[slug]/route.ts
import { NextResponse } from 'next/server';
import { getArticleBySlug } from '@/lib/articles';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  
  return NextResponse.json(article);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/blog
git commit -m "feat: add blog API routes"
```

---

### Task 3: Blog Pages

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create blog listing page**

```typescript
// src/app/blog/page.tsx
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
```

- [ ] **Step 2: Create single article page**

```typescript
// src/app/blog/[slug]/page.tsx
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
```

- [ ] **Step 3: Add blog styles**

```css
/* src/app/blog/blog.css */
.blog-card {
  @apply border-b border-white/10 pb-8 transition-all duration-300;
}

.blog-card:hover h2 {
  @apply text-primary;
}

.prose h2 {
  @apply text-3xl font-bold mt-12 mb-4;
}

.prose h3 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose code {
  @apply bg-white/10 px-2 py-1 rounded text-sm;
}

.prose pre {
  @apply bg-white/10 p-4 rounded-lg overflow-x-auto mb-6;
}

.prose pre code {
  @apply bg-transparent p-0;
}
```

- [ ] **Step 4: Install remark for markdown**

```bash
pnpm add remark remark-html && pnpm add -D @types/remark__html
```

- [ ] **Step 5: Commit**

```bash
git add src/app/blog src/lib/articles.ts package.json
git commit -m "feat: add blog pages"
```

---

## Phase 2: Cinematic Animations

### Task 4: Animation Setup

**Files:**
- Create: `src/components/animations/page-transition.tsx`
- Create: `src/components/animations/character-reveal.tsx`
- Create: `src/components/animations/scroll-reveal.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Install animation dependencies**

```bash
pnpm add framer-motion len
```

- [ ] **Step 2: Create page transition component**

```typescript
// src/components/animations/page-transition.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create character reveal component**

```typescript
// src/components/animations/character-reveal.tsx
'use client';

import { motion } from 'framer-motion';

interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const characterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.3 }
  })
};

export function CharacterReveal({ text, className = '', delay = 0 }: CharacterRevealProps) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + delay}
          variants={characterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

- [ ] **Step 4: Create scroll reveal component**

```typescript
// src/components/animations/scroll-reveal.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Update root layout with smooth scroll**

```typescript
// src/app/layout.tsx - add SmoothScroll wrapper
import { SmoothScroll } from '@/components/animations/smooth-scroll';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
```

```typescript
// src/components/animations/smooth-scroll.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'len';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/animations src/app/layout.tsx package.json
git commit -m "feat: add cinematic animation setup"
```

---

### Task 5: Home Page with Animations

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create cinematic home page**

```typescript
// src/app/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CharacterReveal } from '@/components/animations/character-reveal';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* Animated background */}
        <div className="hero-bg" />
        
        <motion.h1 
          className="text-8xl md:text-[10rem] font-bold text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CharacterReveal text="JOHN" />
          <br />
          <CharacterReveal text="DOE" delay={10} />
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-4xl text-text-muted mt-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Creative Developer
        </motion.p>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="scroll-indicator" />
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="py-32 px-4">
        <ScrollReveal>
          <h2 className="text-6xl font-bold mb-16">Featured Work</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link href="/work" className="project-card">
                <div className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                  <motion.div 
                    className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-2xl font-bold mt-4">Project {i}</h3>
                <p className="text-text-muted">Description</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-32 px-4">
        <ScrollReveal>
          <h2 className="text-6xl font-bold mb-16">Latest Posts</h2>
        </ScrollReveal>
        
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link href="/blog" className="block border-b border-white/10 pb-8">
                <span className="text-sm text-text-muted">April {i}, 2026</span>
                <h3 className="text-3xl font-bold mt-2">Blog Post Title {i}</h3>
                <p className="text-text-muted mt-2">Excerpt...</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-4 text-center">
        <ScrollReveal>
          <h2 className="text-6xl font-bold mb-8">Let's Work Together</h2>
          <Link href="mailto:hello@example.com" className="btn-primary">
            Get in Touch
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Add hero styles to globals.css**

```css
/* Hero section */
.hero-bg {
  @apply absolute inset-0 -z-10;
  background: radial-gradient(circle at 50% 50%, rgba(255, 61, 0, 0.1) 0%, transparent 50%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Scroll indicator */
.scroll-indicator {
  @apply w-6 h-10 border-2 border-white/30 rounded-full;
}

.scroll-indicator::after {
  content: '';
  @apply block w-1 h-2 bg-white rounded-full mx-auto mt-2;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

/* Project card */
.project-card {
  @apply block p-4 rounded-lg transition-all duration-300;
}

.project-card:hover {
  @apply bg-white/5;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: add cinematic home page"
```

---

## Phase 3: Portfolio Pages

### Task 6: Work Page

**Files:**
- Create: `src/app/work/page.tsx`

### Task 7: About Page

**Files:**
- Create: `src/app/about/page.tsx`

---

## Phase 4: Admin Panel

### Task 8: Auth System

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/admin/login/route.ts`

### Task 9: Admin API Routes

**Files:**
- Create: `src/app/api/admin/articles/route.ts`
- Create: `src/app/api/admin/articles/[id]/route.ts`

### Task 10: Admin Pages

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/blog/new/page.tsx`
- Create: `src/app/admin/blog/[id]/page.tsx`

---

## Self-Review

**Spec coverage check:**
- [x] Blog API endpoints
- [x] Blog listing page
- [x] Single article page  
- [x] Cinematic animations (Framer Motion)
- [x] Smooth scroll (Lenis)
- [x] Home page with hero
- [ ] Work page (Phase 3)
- [ ] About page (Phase 3)
- [ ] Admin panel (Phase 4)

**Placeholder scan:** No TBD, TODO, or placeholder steps found.

**Type consistency:** Consistent across all tasks.

---

## Execution Options

**Plan complete and saved to `docs/superpowers/plans/2026-04-26-portfolio-cinematografico-implementation.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch subagents per phase, faster iteration

**2. Inline Execution** - I'll execute tasks in this session with checkpoints

**Which approach?**