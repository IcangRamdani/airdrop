import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

function buildReferralCode(email: string, uid: string) {
  const prefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
  return `${prefix}-${uid.slice(0, 6)}`;
}

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const userRef = db.collection('users').doc(user.uid);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    return null;
  }

  const profile = {
    email: user.email || '',
    username: user.displayName || user.email?.split('@')[0] || 'user',
    wallet_address: '',
    role: 'user',
    points: 0,
    referral_code: buildReferralCode(user.email || 'user', user.uid),
    referred_by: '',
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    last_login: admin.firestore.FieldValue.serverTimestamp(),
    is_banned: false,
  };

  await userRef.set(profile);
  return null;
});

export const preventDuplicateWallet = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  const walletAddress = String(data.wallet_address || '').toLowerCase();
  const users = await db.collection('users').where('wallet_address', '==', walletAddress).get();
  return { exists: !users.empty };
});

export const logFraud = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required');
  }

  const log = {
    user_id: context.auth.uid,
    reason: String(data.reason || 'Unknown suspicious activity'),
    ip_address: context.rawRequest.ip || '',
    created_at: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db.collection('fraud_logs').add(log);
  return { success: true };
});

export const onRewardCreated = functions.firestore.document('rewards/{rewardId}').onCreate(async (snapshot) => {
  const rewardData = snapshot.data();
  if (!rewardData) return null;

  return snapshot.ref.update({
    status: 'pending',
  });
});
