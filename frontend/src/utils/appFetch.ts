import { AppError } from '@app-types/AppError';
import { backendErrorMap } from './backendErrorsMap';
import { UNKNOWN_ERROR } from './constants';

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
      if (res.status >= 400 && res.status <= 499) {
        const error: { message: keyof typeof backendErrorMap } =
          await res.json();

        throw new AppError(
          res.status,
          backendErrorMap[error.message] || UNKNOWN_ERROR,
        );
      }
    }

    return res;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(500, UNKNOWN_ERROR);
  }
};
