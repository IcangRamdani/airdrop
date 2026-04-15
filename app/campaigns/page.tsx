'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCampaigns } from '@/lib/firestore';
import { sampleCampaigns } from '@/lib/sample-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { Campaign } from '@/types/firestore';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns()
      .then((items) => setCampaigns(items))
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false));
  }, []);

  const activeCampaigns = campaigns.length ? campaigns : sampleCampaigns;

  return (
    <div className="container py-16">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Campaign library</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Discover live airdrop campaigns</h1>
        <p className="text-slate-400">Browse campaigns, review task flows, and join the drops that fit your community path.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {loading ? (
          <Card className="p-8 text-center text-slate-300">Loading campaigns…</Card>
        ) : (
          activeCampaigns.map((campaign) => (
            <Card key={campaign.id} className="group relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{campaign.title}</p>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2">{campaign.description}</p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                    {campaign.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span>Reward: {campaign.reward_type}</span>
                  <span>Ends: {new Date(campaign.end_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Link href={`/campaigns/${campaign.id}`} className="text-sm text-violet-300 hover:text-violet-200">
                    View details
                  </Link>
                  <Button variant="secondary">Join campaign</Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
