export type Role = 'admin' | 'moderator' | 'user';

export interface UserProfile {
  email: string;
  username: string;
  wallet_address?: string;
  role: Role;
  points: number;
  referral_code: string;
  referred_by?: string;
  created_at: string;
  last_login: string;
  is_banned: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  reward_type: 'points' | 'token' | 'nft';
  total_rewards: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'paused' | 'finished';
  created_by: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  type: 'twitter' | 'discord' | 'visit' | 'custom' | 'onchain';
  verification_type: 'manual' | 'api';
  reward_points: number;
  required: boolean;
  url?: string;
}

export interface Participant {
  user_id: string;
  joined_at: string;
  progress: number;
  points_earned: number;
  is_completed: boolean;
  is_claimed: boolean;
}

export interface TaskCompletion {
  user_id: string;
  campaign_id: string;
  task_id: string;
  status: 'pending' | 'approved' | 'rejected';
  proof?: string;
  verified_at?: string;
}

export interface Reward {
  user_id: string;
  campaign_id: string;
  amount: number;
  type: 'points' | 'token' | 'nft';
  status: 'pending' | 'issued' | 'claimed';
  tx_hash?: string;
}

export interface Referral {
  referrer_id: string;
  referred_user_id: string;
  created_at: string;
  reward_given: boolean;
}

export interface FraudLog {
  user_id: string;
  reason: string;
  ip_address?: string;
  created_at: string;
}
