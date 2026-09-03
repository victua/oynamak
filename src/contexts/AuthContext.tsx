'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from 'firebase/auth';
import type { UserProfile, UserRole } from '@/lib/types';

interface AuthContextType {
    user: User | null;
    /** Firestore `users/{uid}` document for the signed-in user. */
    profile: UserProfile | null;
    role: UserRole | null;
    /** Set when the profile could not be read (e.g. Firestore rules). */
    profileError: string | null;
    loading: boolean;
    refreshProfile: () => Promise<void>;
    /** Ensures a valid server session cookie; returns an error message or null. */
    syncSession: () => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
    signUp: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
    signInWithGoogle: () => Promise<{ user: User | null; error: string | null }>;
    signOut: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
