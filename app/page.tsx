import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container py-20">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex rounded-full bg-violet-500/10 px-4 py-1 text-sm font-semibold text-violet-200">
              Launch airdrop campaigns faster
            </span>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Build Web3 campaign funnels with real-time task tracking.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              DropHub is a Firebase-powered SaaS for campaign managers and community builders. Create task flows, reward users, and manage claims with a modern dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button>Get started</Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="secondary">Explore campaigns</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Progress</p>
              <p className="mt-3 text-3xl font-semibold text-white">Realtime rewards</p>
            </Card>
            <Card className="bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Wallet</p>
              <p className="mt-3 text-3xl font-semibold text-white">RainbowKit ready</p>
            </Card>
            <Card className="bg-slate-900/80">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admin</p>
              <p className="mt-3 text-3xl font-semibold text-white">Campaign management</p>
            </Card>
          </div>
        </div>

        <Card className="space-y-6 bg-slate-900/85 p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Sample campaign</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Galaxy Collector Airdrop</h2>
          </div>
          <div className="space-y-4 text-slate-300">
            <p>Join an onboarding campaign, verify social tasks, connect wallet, and earn points redeemable for token rewards.</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Follow Twitter</li>
              <li>• Join Discord</li>
              <li>• Visit website</li>
              <li>• Submit wallet address</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/campaigns">
              <Button>View campaign</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
