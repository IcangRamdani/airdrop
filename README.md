# DropHub Airdrop Management SaaS

A modern Web3 airdrop campaign platform built with Next.js App Router, TailwindCSS, Firebase, and RainbowKit.

## Features
- Email/password and Google authentication
- Firestore campaign, task, participant, and reward structures
- Wallet connection with RainbowKit + Wagmi
- Real-time campaign and profile experience
- Admin campaign management panel
- Firebase Cloud Functions for user onboarding, referral generation, and fraud logs

## Tech stack
- Frontend: Next.js, React, TailwindCSS
- Backend: Firebase Auth, Firestore, Storage, Cloud Functions
- Wallet: RainbowKit + Wagmi
- Blockchain support: Ethers.js

## Setup

1. Install dependencies

```bash
npm install
cd functions
npm install
cd ..
```

2. Create `.env.local` in the root with the Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

3. Initialize Firebase project and deploy rules/functions

```bash
npx firebase login
npx firebase use --add
npx firebase deploy --only firestore,functions,storage
```

4. Run local development

```bash
npm run dev
```

## Firebase structure

- `users/{userId}`: profile, role, wallet, referral code, points
- `campaigns/{campaignId}`: campaign metadata
- `campaigns/{campaignId}/tasks/{taskId}`: tasks for each campaign
- `campaigns/{campaignId}/participants/{userId}`: progress and claim state
- `task_completions/{id}`: task proof records
- `rewards/{rewardId}`: reward claims
- `referrals/{refId}`: referral tracking
- `fraud_logs/{id}`: fraud and risk logs

## Vercel deployment

1. Create a Vercel project and connect your repository.
2. Add environment variables in Vercel using the same keys from `.env.local`.
3. Set the build command to:

```bash
npm run build
```

4. Output directory: `.`

## Firebase rules

- `firestore.rules`: user-level read/write protection, admin-only campaign edits, task and reward restrictions
- `storage.rules`: authenticated writes and public reads

## Notes

- `lib/firebase.ts` initializes Firebase safely and avoids analytics for SSR.
- `components/wallet-provider.tsx` sets up RainbowKit and Wagmi.
- `functions/src/index.ts` includes user creation and fraud logging triggers.

## Next steps

- Add API verification for social tasks
- Implement referral reward issuance
- Add more detailed admin analytics and CSV export
- Expand fraud scoring with Cloud Functions
