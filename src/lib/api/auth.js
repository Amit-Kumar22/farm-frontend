import { apiFetch } from '../apiClient';

export const authApi = {
  login: (body) => apiFetch('/auth/login', { method: 'POST', body }),
  logout: () => apiFetch('/auth/logout', { method: 'POST' }),
  me: (cookie) => apiFetch('/auth/me', { cookie, cache: 'no-store' }),
};
