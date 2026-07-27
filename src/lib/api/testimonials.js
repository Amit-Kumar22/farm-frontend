import { createResourceApi } from './resource';
import { apiFetch } from '../apiClient';

const testimonialsApi = createResourceApi('testimonials');

// Add status update method
testimonialsApi.updateStatus = async (id, status) => {
  return apiFetch(`/admin/testimonials/${id}/status`, { method: 'PATCH', body: { status } });
};

// Add public submission method
testimonialsApi.submit = async (data) => {
  return apiFetch('/testimonials/submit', { method: 'POST', body: data });
};

export { testimonialsApi };
