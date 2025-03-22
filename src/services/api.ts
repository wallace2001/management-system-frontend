import { getToken } from '@/lib/auth';
import { env } from '@/lib/env';

import ky from 'ky';

const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
  hooks: {
    beforeRequest: [
      async (request) => {
        try {
          const token = await getToken();
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        } catch (error) {
          console.error('Erro ao obter token:', error);
        }
      },
    ],
    // afterResponse: [
    //   async (input, _, response) => {
    //     if (response.status !== 401) return response;
    //     try {
    //       const response = await ky(input.url, {
    //         method: input.method,
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${tokens.token}`,
    //         },
    //         timeout: 50000,
    //       });

    //       return response;
    //     } catch (error) {
    //       console.error('Erro ao tentar refresh do token:', error);
    //       await logout();
    //       return response;
    //     }
    //   },
    // ],
  },
});
export { api };
