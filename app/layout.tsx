import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SiteNavbar } from '@/components/site-navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DropHub | Airdrop Campaigns',
  description: 'Modern crypto airdrop management SaaS for campaigns, tasks, and rewards.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <SiteNavbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
