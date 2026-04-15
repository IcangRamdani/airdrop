'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function SiteNavbar() {
  const { user, profile, logout } = useAuth();

  return (
    <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          DropHub
        </Link>

        <nav className="flex flex-wrap items-center gap-3">
          <Link href="/campaigns" className="text-sm text-slate-300 hover:text-white">
            Campaigns
          </Link>
          <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">
            Dashboard
          </Link>
          <Link href="/profile" className="text-sm text-slate-300 hover:text-white">
            Profile
          </Link>
          {profile?.role === 'admin' ? (
            <Link href="/admin" className="text-sm text-slate-300 hover:text-white">
              Admin
            </Link>
          ) : null}
          {user ? (
            <Button variant="ghost" onClick={logout} className="rounded-full px-4 py-2 text-sm">
              Sign out
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="primary" className="rounded-full px-4 py-2 text-sm">
                Sign in
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
