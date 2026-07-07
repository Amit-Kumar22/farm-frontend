import config from '@/config';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(path, { method = 'GET', body, cookie, cache, next, headers = {} } = {}) {
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  let res;
  try {
    res = await fetch(`${config.apiBaseUrl}${path}`, {
      method,
      credentials: 'include',
      cache,
      next,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(cookie ? { Cookie: cookie } : {}),
        ...headers,
      },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });
  } catch {
    throw new ApiError(0, 'Could not reach the server. Is the API running?');
  }

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    throw new ApiError(res.status, data?.message || 'Something went wrong');
  }

  return data;
}
