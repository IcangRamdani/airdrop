'use client';

import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user, profile, logout, loading } = useAuth();

  if (!user && !loading) {
    return (
      <div className="container py-16 text-slate-300">
        <p>Please sign in to access your profile.</p>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Profile</p>
            <h1 className="text-3xl font-semibold text-white">Account settings</h1>
            <p className="text-slate-400">Update your Web3 identity and referral preferences.</p>
          </div>

          <div className="space-y-4 text-slate-200">
            <div>
              <p className="text-sm text-slate-400">Email</p>
              <p className="mt-1 text-lg text-white">{profile?.email || user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Username</p>
              <p className="mt-1 text-lg text-white">{profile?.username || 'Anonymous'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Referral code</p>
              <p className="mt-1 text-lg text-white">{profile?.referral_code || 'Not available'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Role</p>
              <p className="mt-1 text-lg text-white">{profile?.role}</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Wallet</p>
            <h2 className="text-2xl font-semibold text-white">Wallet address</h2>
            <p className="text-slate-400">Add your wallet address to track rewards and claim tokens.</p>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-900/80 p-4">
            <label className="text-sm font-medium text-slate-300">Your wallet</label>
            <input 
              type="text" 
              placeholder="0x..." 
              value={profile?.wallet_address || ''} 
              disabled
              className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-sm text-slate-400"
            />
          </div>

          <Button variant="ghost" onClick={logout} className="w-full">
            Sign out
          </Button>
        </Card>
      </div>
    </div>
  );
}
