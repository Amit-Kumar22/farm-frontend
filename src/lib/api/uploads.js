import { apiFetch } from '../apiClient';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export function uploadFile(file, type) {
  // Validate file size on frontend before upload
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    throw new Error(`File size (${sizeMB} MB) exceeds maximum allowed size of ${maxSizeMB} MB`);
  }
  
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch(`/uploads?type=${type}`, { method: 'POST', body: formData });
}

export function uploadVideo(file, type = 'blog-videos') {
  const formData = new FormData();
  formData.append('file', file);
  return apiFetch(`/uploads/video?type=${type}`, { method: 'POST', body: formData });
}
