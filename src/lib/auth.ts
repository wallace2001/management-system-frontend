import { TOKEN } from '@/constants/cookies';
import { getCookie, setCookie } from 'cookies-next';

export async function setToken(token: string) {
  return setCookie(TOKEN, token);
}

export function getToken() {
  return getCookie(TOKEN);
}

export async function logout() {
  return new Promise(async (resolve) => {
    window.localStorage.clear();
    window.location.pathname = '/auth/login';
    resolve(true);
  });
}
