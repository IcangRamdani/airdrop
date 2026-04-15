'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchCampaignById, fetchTasks, joinCampaign, createTaskCompletion } from '@/lib/firestore';
import { sampleCampaigns, sampleTasks } from '@/lib/sample-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CampaignPageProps {
  params: { id: string };
}

export default function CampaignDetailPage({ params }: CampaignPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [campaign, setCampaign] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    fetchCampaignById(params.id)
      .then((data) => {
        if (data) {
          setCampaign(data);
        } else {
          const fallback = sampleCampaigns.find((item) => item.id === params.id);
          setCampaign(fallback ?? null);
        }
      })
      .catch(() => setCampaign(null));

    fetchTasks(params.id)
      .then((items) => setTasks(items))
      .catch(() => setTasks(sampleTasks));
  }, [params.id, router, user, loading]);

  const handleJoin = async () => {
    if (!user) return;
    try {
      await joinCampaign(params.id, user.uid);
      setIsJoined(true);
    } catch (err) {
      setJoinError('Unable to join campaign. Please try again.');
    }
  };

  const handleTaskComplete = async (taskId: string) => {
    if (!user) return;
    await createTaskCompletion({ user_id: user.uid, campaign_id: params.id, task_id: taskId });
    setJoinError('Task completion submitted for review.');
  };

  if (!campaign) {
    return (
      <div className="container py-16 text-slate-300">
        <p>Loading campaign details…</p>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_0.5fr]">
        <section className="space-y-6">
          <Card className="space-y-6 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Campaign</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">{campaign.title}</h1>
              </div>
              <Badge variant={campaign.status === 'active' ? 'success' : 'outline'}>{campaign.status}</Badge>
            </div>
            <p className="text-slate-300">{campaign.description}</p>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Reward type: {campaign.reward_type}</p>
              <p>Start: {new Date(campaign.start_date).toLocaleDateString()}</p>
              <p>End: {new Date(campaign.end_date).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={handleJoin} disabled={isJoined}>
                {isJoined ? 'Joined' : 'Join campaign'}
              </Button>
              <Button variant="secondary" onClick={() => router.push('/campaigns')}>
                Back to campaigns
              </Button>
            </div>
            {joinError ? <p className="text-sm text-rose-400">{joinError}</p> : null}
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Task list</h2>
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-white">{task.title}</p>
                      <p className="mt-2 text-sm text-slate-400">Type: {task.type}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{task.verification_type}</span>
                      <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">{task.reward_points} pts</span>
                      <Button variant="secondary" onClick={() => handleTaskComplete(task.id)}>
                        Submit proof
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <Card className="p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Progress</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-900/80 p-4">
                <p className="text-sm text-slate-400">Your task completion is recorded in Firestore.</p>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-4">
                <p className="text-sm text-slate-400">Claim rewards after tasks are approved.</p>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
