'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserProfile } from '@/types/firestore';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, username: string, referralCode?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          setProfile(snapshot.data() as UserProfile);
          await updateDoc(userRef, {
            last_login: new Date().toISOString(),
          });
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const registerWithEmail = async (email: string, password: string, username: string, referralCode?: string) => {
    const { createUserWithEmailAndPassword } = await import('firebase/auth');
    const { uid } = await createUserWithEmailAndPassword(auth, email, password).then((result) => result.user);
    const userRef = doc(db, 'users', uid);
    const newProfile: UserProfile = {
      email,
      username,
      role: 'user',
      wallet_address: '',
      points: 0,
      referral_code: referralCode ? `${username.toLowerCase()}-${Date.now()}` : `${username.toLowerCase()}-${Math.floor(Math.random() * 10000)}`,
      referred_by: referralCode || '',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
      is_banned: false,
    };
    await setDoc(userRef, newProfile);
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const value = useMemo(
    () => ({ user, profile, loading, loginWithEmail, registerWithEmail, loginWithGoogle, logout }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
