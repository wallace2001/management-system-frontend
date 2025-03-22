import { TOKEN, USER_ID } from '@/constants/cookies';
import { Profile } from '@/modules/shared/types/profile';
import { api } from '@/services/api';
import { HTTPError } from 'ky';
import NextAuth, { CredentialsSignin } from 'next-auth';

import Credentials from 'next-auth/providers/credentials';

type LoginResponse = {
  access_token: string;
};

class AuthError extends CredentialsSignin {
  constructor(code = 'credentials') {
    super();
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const loginData = await api
            .post<LoginResponse>('auth/login', {
              json: credentials,
            })
            .json();

          const profileData = await api
            .get<Profile>('auth/me', {
              headers: {
                Authorization: `Bearer ${loginData.access_token}`,
              },
              timeout: 1000 * 120,
            })
            .json();

          const { cookies } = await import('next/headers');
          const cookiesStore = await cookies();
          cookiesStore.set(USER_ID, profileData.id);
          cookiesStore.set(TOKEN, loginData.access_token);

          return {
            user: profileData,
            ...loginData,
          };
        } catch (error) {
          console.log(error);

          if (error instanceof HTTPError) {
            const response = await error.response.json();
            throw new AuthError(response.message);
          }

          throw new AuthError('Não foi possível realizar o login.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, session, trigger, user }) {
      token.user = {
        ...token.user,
        ...user,
      };

      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          ...session?.user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...token.user,
        ...session.user,
      };
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnAPIRoutes = nextUrl.pathname.startsWith('/api');
      const isOnPublicPages =
        nextUrl.pathname.startsWith('/auth') &&
        !nextUrl.pathname.startsWith('/authorized');
      const isOnPrivatePages = !isOnPublicPages;

      if (isOnPrivatePages && !isLoggedIn) {
        return Response.redirect(new URL('/auth/login', nextUrl));
      }

      if (isOnPublicPages && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (isOnAPIRoutes && !isLoggedIn) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
      }

      return true;
    },
  },
})