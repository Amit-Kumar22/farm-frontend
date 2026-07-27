import { apiFetch } from '../apiClient';

export const MAX_IMAGE_SIZE = 600 * 1024; // 600 KB
export const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5 MB

export function uploadFile(file, type) {
  // Validate file size on frontend before upload
  if (file.size > MAX_IMAGE_SIZE) {
    const sizeKB = (file.size / 1024).toFixed(0);
    const maxSizeKB = (MAX_IMAGE_SIZE / 1024).toFixed(0);
    throw new Error(`Image size (${sizeKB} KB) exceeds the maximum allowed limit of ${maxSizeKB} KB`);
  }

  const formData = new FormData();
  formData.append('file', file);
  return apiFetch(`/uploads?type=${type}`, { method: 'POST', body: formData });
}

export function uploadVideo(file, type = 'blog-videos') {
  // Validate file size on frontend before upload
  if (file.size > MAX_VIDEO_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const maxSizeMB = (MAX_VIDEO_SIZE / (1024 * 1024)).toFixed(0);
    throw new Error(`Video size (${sizeMB} MB) exceeds the maximum allowed limit of ${maxSizeMB} MB`);
  }

  const formData = new FormData();
  formData.append('file', file);
  return apiFetch(`/uploads/video?type=${type}`, { method: 'POST', body: formData });
}
