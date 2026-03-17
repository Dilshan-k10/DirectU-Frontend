const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL. Set it in your .env (e.g. VITE_API_BASE_URL=http://localhost:5001).');
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '');

  if (!res.ok) {
    const message =
      (body && typeof body === 'object' && (body.message || body.error)) ||
      (typeof body === 'string' && body) ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return body;
}

export async function getApplicationResult(applicationId) {
  if (!applicationId) throw new Error('Missing applicationId');
  return await request(`/applications/${encodeURIComponent(applicationId)}/result`, { method: 'GET' });
}

export async function reconsiderApplication(applicationId, newProgramId) {
  if (!applicationId) throw new Error('Missing applicationId');
  if (!newProgramId) throw new Error('Missing newProgramId');
  return await request(`/applications/${encodeURIComponent(applicationId)}/reconsider`, {
    method: 'PUT',
    body: JSON.stringify({ new_program_id: newProgramId }),
  });
}

