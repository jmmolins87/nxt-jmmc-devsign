'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!res.ok) {
      setError('Invalid credentials');
      return;
    }
    
    const { token } = await res.json();
    localStorage.setItem('admin_token', token);
    router.push('/admin');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Admin Login</h1>
        
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}
        
        <div>
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-orange-500 outline-none"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
        >
          Login
        </button>
      </form>
    </main>
  );
}