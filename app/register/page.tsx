'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const { registerWithEmail, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');

  if (user && !loading) {
    router.push('/dashboard');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await registerWithEmail(email, password, username, referralCode);
      router.push('/dashboard');
    } catch (err) {
      setError('Unable to register. Please verify your information.');
    }
  };

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-xl space-y-8 rounded-[32px] border border-white/10 bg-slate-950/80 p-10 shadow-glow">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-violet-300">Create account</p>
          <h1 className="text-3xl font-semibold text-white">Join the airdrop community</h1>
          <p className="text-slate-400">Register with email and start earning points across campaigns, tasks, and rewards.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Username</label>
            <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Your display name" type="text" required />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" required />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create password" type="password" required />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Referral code</label>
            <Input value={referralCode} onChange={(event) => setReferralCode(event.target.value)} placeholder="Optional" type="text" />
          </div>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <Button type="submit" className="w-full">Create account</Button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-300 hover:text-violet-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
