'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

export const clientAuth = () => getAuth(getApps().length ? getApp() : initializeApp(firebaseConfig));
