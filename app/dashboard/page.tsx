'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchCampaigns } from '@/lib/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Campaign } from '@/types/firestore';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    fetchCampaigns().then((items) => setCampaigns(items)).catch(() => setCampaigns([]));
  }, []);

  if (!user || loading) {
    return (
      <div className="container py-16 text-slate-300">
        <p>Loading your workspace…</p>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-glow">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Welcome back</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">{profile?.username ?? 'Airdrop user'}</h1>
                <p className="mt-2 text-sm leading-6 text-slate-400">Track campaigns, tasks, and claim rewards in real time from a Firebase-backed dashboard.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card className="bg-slate-900/90 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Points</p>
                <p className="mt-3 text-3xl font-semibold text-white">{profile?.points ?? 0}</p>
              </Card>
              <Card className="bg-slate-900/90 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Role</p>
                <p className="mt-3 text-3xl font-semibold text-white">{profile?.role}</p>
              </Card>
              <Card className="bg-slate-900/90 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Status</p>
                <p className="mt-3 text-3xl font-semibold text-white">{profile?.is_banned ? 'Banned' : 'Active'}</p>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Your campaigns</p>
                <h2 className="text-2xl font-semibold text-white">Latest airdrops</h2>
              </div>
              <Link href="/campaigns">
                <Button variant="secondary">Explore all</Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <Card key={campaign.id} className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{campaign.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{campaign.description}</p>
                    </div>
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-violet-200">
                      {campaign.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <Card className="space-y-4 p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Profile quick glance</p>
            <div className="space-y-3 text-slate-300">
              <p>Email: {profile?.email}</p>
              <p>Wallet: {profile?.wallet_address || 'Not connected'}</p>
              <p>Referral code: {profile?.referral_code}</p>
            </div>
            <Link href="/profile">
              <Button variant="primary">Manage profile</Button>
            </Link>
          </Card>
        </section>
      </div>
    </div>
  );
}
