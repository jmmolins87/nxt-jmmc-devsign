'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/admin" className="text-xl font-bold">Admin</a>
        <div className="flex gap-4">
          <a href="/admin/blog/new" className="text-orange-400 hover:text-orange-300">New Article</a>
          <button
            onClick={() => {
              localStorage.removeItem('admin_token');
              router.push('/admin/login');
            }}
            className="text-text-muted hover:text-white"
          >
            Logout
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
}