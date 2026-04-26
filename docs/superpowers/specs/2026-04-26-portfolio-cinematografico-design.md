# Portfolio Cinematográfico - Specification

## Project Overview

- **Project name:** nxt-jmmcdevsign (Personal Portfolio)
- **Type:** Híbrido (Personal + Profesional)
- **Core functionality:** Portfolio con animaciones cinematográficas brillantes/maximalistas y blog con backend propio para publicar artículos semanales
- **Target users:** Potenciales clientes, empleadores, y lectores del blog

---

## Architecture

### Stack

- **Frontend:** Next.js 16.2.4 with React Compiler
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Smooth scroll:** Lenis
- **Backend:** Next.js API Routes + Better-SQLite3 (local) / PostgreSQL (production)
- **Auth:** Simple JWT-based for admin panel
- **Database:** SQLite (dev) / PostgreSQL (prod)

### URL Structure

```
/                     → Intro with cinematic animations
/work                 → Portfolio/projects gallery
/about                → About page
/blog                 → Blog listing
/blog/[slug]           → Single article
/admin                → Admin panel (protected)
/admin/blog/new        → Create new article
/admin/blog/[id]       → Edit article
```

---

## UI/UX Specification

### Design System - Brillante/Maximalista

**Color Palette:**
```css
--color-bg: #0a0a0a;           /* Near black */
--color-bg-secondary: #141414;    /* Dark gray */
--color-primary: #ff3d00;      /* Vibrant orange-red */
--color-accent: #00e5ff;       /* Cyan accent */
--color-text: #ffffff;          /* White */
--color-text-muted: #a0a0a0;   /* Muted gray */
--color-gradient-1: #ff3d00 → #ff6f00;
--color-gradient-2: #00e5ff → #00ff88;
```

**Typography:**
- Headings: Bold, large (4xl-6xl)
- Body: Clean sans-serif (Geist or similar)
- Accents: Monospace for technical elements

**Spacing:** Generous whitespace (16-32px base units)

---

## Page Specifications

### 1. Home Page (`/`)

**Sections:**
1. **Hero Section** - Full viewport
   - Animated name/title with character-by-character reveal
   - Glitch effect on hover
   - Particle or geometric background animation
   - Scroll indicator with bounce animation

2. **Featured Work** - Horizontal scroll gallery
   - Large project cards with hover effects
   - Video/image reveals with clip-path

3. **Services/Offer** - Staggered reveal on scroll

4. **Latest Blog Posts** - 3 most recent articles

5. **Contact/Footer** - Minimal with social links

**Animations:**
- Page load: Staggered reveal (title → subtitle → CTA)
- Scroll-driven: Elements fade in with slight scale
- Hover: Scale, glow, or cursor-follow effects
- Page transitions: Cross-fade with slight zoom

### 2. Work Page (`/work`)

**Features:**
- Grid of projects (masonry or asymmetric)
- Filter by category
- Modal or page navigation to detail
- Project detail with media gallery

### 3. About Page (`/about`)

**Features:**
- Photo with reveal effect
- Bio text with typewriter effect
- Skills/tools with progress or tag animations
- Timeline of experience

### 4. Blog Pages (`/blog`, `/blog/[slug]`)

**Blog Listing:**
- Card layout for articles
- Featured image, title, excerpt, date
- Pagination

**Single Article:**
- Clean reading layout
- Markdown content with syntax highlighting
- Related articles

### 5. Admin Panel (`/admin`)

**Features:**
- Login with password
- Dashboard with article list
- Rich text editor (Markdown)
- Preview mode
- Publish/Unpublish toggle

---

## Backend API Specification

### Database Schema

```sql
-- Articles table
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users table (admin)
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/blog` | List published articles | No |
| GET | `/api/blog/[slug]` | Get single article | No |
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/articles` | List all articles | Yes |
| POST | `/api/admin/articles` | Create article | Yes |
| PUT | `/api/admin/articles/[id]` | Update article | Yes |
| DELETE | `/api/admin/articles/[id]` | Delete article | Yes |

---

## Animation Specifications

### Core Animations (Framer Motion)

```typescript
// Page transition
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Character reveal
const titleVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

// Scroll reveal
const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

### Special Effects

1. **Glitch effect** - On title hover
2. **Cursor follower** - Custom cursor with trail
3. **Particle background** - Canvas-based
4. **Parallax scroll** - On images/sections
5. **Glow effects** - On hover states

---

## Implementation Phases

### Phase 1: Core + Blog
- [ ] Setup SQLite database
- [ ] Create API routes
- [ ] Build blog listing page
- [ ] Build single article page
- [ ] Basic styling and layout

### Phase 2: Animations
- [ ] Framer Motion setup
- [ ] Home page with cinematic animations
- [ ] Scroll-driven animations
- [ ] Page transitions

### Phase 3: Portfolio Pages
- [ ] Work page with gallery
- [ ] About page
- [ ] Work detail pages

### Phase 4: Admin Panel
- [ ] Auth system
- [ ] Admin dashboard
- [ ] Article editor

---

## Acceptance Criteria

- [ ] Home page loads with cinematic animations
- [ ] Smooth scroll works without jank
- [ ] Blog articles can be created/edited via admin
- [ ] Blog listing shows published articles
- [ ] Individual article pages render markdown
- [ ] Page transitions are smooth
- [ ] Mobile responsive without animation issues
- [ ] Build passes with `pnpm build`
- [ ] No lint errors with `pnpm lint`

---

## Notes

- Using SQLite for local dev (easy to switch to PostgreSQL)
- Admin panel uses simple JWT auth
- Animations should be reduced on `prefers-reduced-motion`
- Consider loading states for better UX