import { authConfig } from './auth-config';

import NextAuth from 'next-auth';

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(authConfig);
