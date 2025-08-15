import { AppError } from '../types/AppError';

export const appFetch = async (
  url: string,
  init: RequestInit,
  isFileUpload: boolean = false,
): Promise<Response> => {
  const headers = new Headers(init?.headers);

  if (!headers?.has('Content-Type') && !isFileUpload) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(url, {
      ...init,
      headers,
    });

    if (!res.ok) {
      throw new AppError(res.status, 'Something went wrong!'); // TODO: better error handling
    }

    return res;
  } catch (error) {
    throw new AppError(500, 'Internal server error!');
  }
};
