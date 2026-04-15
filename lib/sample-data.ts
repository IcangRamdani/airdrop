import type { Campaign, Task } from '@/types/firestore';

export const sampleCampaigns: Campaign[] = [
  {
    id: 'demo-galaxy',
    title: 'Galaxy Collector Airdrop',
    description: 'A beginner-friendly campaign for web3 explorers. Complete tasks, connect your wallet, and earn community points.',
    reward_type: 'points',
    total_rewards: 1850,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    status: 'active',
    created_by: 'system',
    created_at: new Date().toISOString(),
  },
];

export const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Follow our Twitter account',
    type: 'twitter',
    verification_type: 'manual',
    reward_points: 150,
    required: true,
    url: 'https://twitter.com',
  },
  {
    id: 'task-2',
    title: 'Join Discord community',
    type: 'discord',
    verification_type: 'manual',
    reward_points: 250,
    required: true,
    url: 'https://discord.com',
  },
  {
    id: 'task-3',
    title: 'Visit the campaign website',
    type: 'visit',
    verification_type: 'api',
    reward_points: 100,
    required: false,
    url: 'https://example.com',
  },
  {
    id: 'task-4',
    title: 'Submit wallet address on-chain',
    type: 'onchain',
    verification_type: 'manual',
    reward_points: 500,
    required: true,
    url: '',
  },
];
