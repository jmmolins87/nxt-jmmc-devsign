<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 - Breaking Changes

This is **Next.js 16.2.4** (canary/future version). APIs, conventions, and file structure differ from stable Next.js. Read `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.

## Dev Commands

```bash
pnpm dev     # Start dev server (http://localhost:3000)
pnpm build   # Production build
pnpm start   # Start production server
pnpm lint    # ESLint (v9 with flat config)
```

**No typecheck or test scripts** in this project.

## Project Structure

- `src/app/` - App Router (page.tsx, layout.tsx, globals.css)
- Entry: `src/app/page.tsx`

## Notable Config

- React Compiler enabled (`next.config.ts`: `reactCompiler: true`)
- Tailwind CSS v4 (`@tailwindcss/postcss@^4`)
- ESLint v9 flat config (`eslint.config.mjs`)
- `tsconfig.json` paths: `@/*` = `./src/*`
<!-- END:nextjs-agent-rules -->