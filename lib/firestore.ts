import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  increment,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Campaign, Participant, Task, TaskCompletion, UserProfile } from '@/types/firestore';

function normalizeDate(value: any) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value.toDate === 'function') return value.toDate().toISOString();
  return new Date(value).toISOString();
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const snapshot = await getDocs(collection(db, 'campaigns'));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Campaign, 'id'>),
    start_date: normalizeDate((item.data() as any).start_date),
    end_date: normalizeDate((item.data() as any).end_date),
  }));
}

export async function fetchCampaignById(campaignId: string): Promise<Campaign | null> {
  const docRef = doc(db, 'campaigns', campaignId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...(data as Omit<Campaign, 'id'>),
    start_date: normalizeDate((data as any).start_date),
    end_date: normalizeDate((data as any).end_date),
  };
}

export async function fetchTasks(campaignId: string): Promise<Task[]> {
  const snapshot = await getDocs(collection(db, 'campaigns', campaignId, 'tasks'));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Task, 'id'>),
  }));
}

export async function fetchParticipant(campaignId: string, userId: string): Promise<Participant | null> {
  const snapshot = await getDoc(doc(db, 'campaigns', campaignId, 'participants', userId));
  if (!snapshot.exists()) return null;
  return snapshot.data() as Participant;
}

export async function joinCampaign(campaignId: string, userId: string): Promise<void> {
  const ref = doc(db, 'campaigns', campaignId, 'participants', userId);
  await setDoc(ref, {
    user_id: userId,
    joined_at: new Date().toISOString(),
    progress: 0,
    points_earned: 0,
    is_completed: false,
    is_claimed: false,
  });
}

export async function createTaskCompletion(payload: {
  user_id: string;
  campaign_id: string;
  task_id: string;
  proof?: string;
}) {
  const id = `${payload.user_id}-${payload.campaign_id}-${payload.task_id}`;
  const ref = doc(db, 'task_completions', id);
  await setDoc(ref, {
    ...payload,
    status: 'pending',
    verified_at: null,
  });
}

export async function markTaskComplete(campaignId: string, userId: string, taskId: string, rewardPoints: number) {
  const participantRef = doc(db, 'campaigns', campaignId, 'participants', userId);
  const completionRef = doc(db, 'task_completions', `${userId}-${campaignId}-${taskId}`);
  const batch = writeBatch(db);

  batch.set(completionRef, {
    user_id: userId,
    campaign_id: campaignId,
    task_id: taskId,
    status: 'pending',
    proof: '',
    verified_at: null,
  });

  batch.update(participantRef, {
    points_earned: increment(rewardPoints),
    progress: 100,
  });

  await batch.commit();
}

export async function fetchUserCampaigns(userId: string): Promise<Campaign[]> {
  const participantsSnapshot = await getDocs(collection(db, 'campaigns'));
  return participantsSnapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<Campaign, 'id'>),
    start_date: normalizeDate((item.data() as any).start_date),
    end_date: normalizeDate((item.data() as any).end_date),
  }));
}

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, 'users', userId));
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}
