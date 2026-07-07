import { apiFetch } from '../apiClient';

export function uploadFile(file, type) {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch(`/uploads?type=${type}`, { method: 'POST', body: formData });
}
