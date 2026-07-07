import { apiFetch } from '../apiClient';

export function createResourceApi(resourcePath) {
  return {
    list: (query = '', opts = {}) =>
      apiFetch(`/${resourcePath}${query}`, { cache: 'no-store', ...opts }),
    getBySlug: (slug, opts = {}) =>
      apiFetch(`/${resourcePath}/${slug}`, { cache: 'no-store', ...opts }),
    adminList: (cookie) => apiFetch(`/admin/${resourcePath}`, { cookie, cache: 'no-store' }),
    adminGet: (id, cookie) => apiFetch(`/admin/${resourcePath}/${id}`, { cookie, cache: 'no-store' }),
    create: (body) => apiFetch(`/admin/${resourcePath}`, { method: 'POST', body }),
    update: (id, body) => apiFetch(`/admin/${resourcePath}/${id}`, { method: 'PUT', body }),
    remove: (id) => apiFetch(`/admin/${resourcePath}/${id}`, { method: 'DELETE' }),
  };
}
