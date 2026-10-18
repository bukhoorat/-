'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Incorrect password');
      }
    } catch {
      setError('Connection error');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zaren-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif tracking-[0.3em] text-zaren-gold-champagne mb-2">ZAREN</h1>
          <p className="text-xs tracking-[0.2em] uppercase text-zaren-muted">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-widest uppercase text-zaren-muted mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-zaren-charcoal border border-zaren-gold-champagne/20 px-4 py-3 text-sm text-zaren-ivory rounded focus:border-zaren-gold-champagne/50 outline-none transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full btn-gold-solid disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? 'Entering...' : 'Enter Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-zaren-muted/50 hover:text-zaren-gold-champagne">
            ← Back to ZAREN
          </a>
        </div>
      </div>
    </div>
  );
}
