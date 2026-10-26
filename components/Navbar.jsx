'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, LogOut, Loader2 } from 'lucide-react';

export default function Navbar({ user }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#0a0d18]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href={user ? '/dashboard' : '/'}
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
          id="navbar-brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors shadow-lg shadow-blue-500/10">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Study<span className="text-white">Planner</span>
          </span>
        </Link>

        {/* Center Links (Matching Screen 1) */}
        {!user && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="text-white transition-colors">
              Home
            </Link>
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
        )}

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {initials}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white line-clamp-1">{user.name}</p>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{user.email}</p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                id="navbar-logout-btn"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 transition-all duration-200"
              >
                {loggingOut ? (
                  <Loader2 className="w-4 h-4 animate-spin text-rose-400" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                id="navbar-login-btn"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                id="navbar-signup-btn"
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-500/25 active:scale-95 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
