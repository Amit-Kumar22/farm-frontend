import { apiFetch } from '../apiClient';

export const siteSettingsApi = {
  get: (opts = {}) => apiFetch('/site-settings', { cache: 'no-store', ...opts }),
  adminGet: (cookie) => apiFetch('/admin/site-settings', { cookie, cache: 'no-store' }),
  update: (body) => apiFetch('/admin/site-settings', { method: 'PUT', body }),
};
