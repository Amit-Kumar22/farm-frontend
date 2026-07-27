import { apiFetch } from '../apiClient';

export const newsTickerApi = {
  // Public: Get all active ticker items
  list: () => apiFetch('/news-ticker', { cache: 'no-store' }),

  // Admin: Get all ticker items (including inactive)
  listAll: () => apiFetch('/news-ticker/admin', { cache: 'no-store' }),

  // Admin: Get single ticker item
  getById: (id) => apiFetch(`/news-ticker/${id}`, { cache: 'no-store' }),

  // Admin: Create ticker item
  create: (data) => apiFetch('/news-ticker', { method: 'POST', body: data }),

  // Admin: Update ticker item
  update: (id, data) => apiFetch(`/news-ticker/${id}`, { method: 'PUT', body: data }),

  // Admin: Delete ticker item
  delete: (id) => apiFetch(`/news-ticker/${id}`, { method: 'DELETE' }),
};
