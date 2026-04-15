'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { Campaign } from '@/types/firestore';

export default function AdminPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard');
    }
  }, [loading, user, profile, router]);

  useEffect(() => {
    getDocs(collection(db, 'campaigns'))
      .then((snapshot) =>
        setCampaigns(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...(item.data() as Omit<Campaign, 'id'>),
          }))
        )
      )
      .catch(() => setCampaigns([]));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    const id = title.toLowerCase().replace(/\s+/g, '-');
    const campaignRef = doc(db, 'campaigns', id);
    await setDoc(campaignRef, {
      title,
      description,
      reward_type: 'points',
      total_rewards: 0,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      status,
      created_by: user?.uid || 'admin',
      created_at: new Date().toISOString(),
    });
    setMessage('Campaign created successfully. Refresh to see it in the list.');
  };

  if (!user || loading) {
    return <div className="container py-16 text-slate-300">Loading admin tools…</div>;
  }

  return (
    <div className="container py-16">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Admin panel</p>
          <h1 className="text-4xl font-semibold text-white">Manage campaigns</h1>
          <p className="text-slate-400">Create campaigns, review participants, and monitor platform metrics.</p>
        </div>

        <Card className="p-8">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm text-slate-300">Title</label>
                <Input value={title} onChange={(event) => setTitle(event.target.value)} required />
              </div>
              <div>
                <label className="text-sm text-slate-300">Status</label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none"
                >
                  <option value="active">active</option>
                  <option value="paused">paused</option>
                  <option value="finished">finished</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-2 min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none"
                required
              />
            </div>
            <Button type="submit">Create campaign</Button>
            {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
          </form>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Active campaigns</h2>
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{campaign.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{campaign.description}</p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{campaign.status}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
