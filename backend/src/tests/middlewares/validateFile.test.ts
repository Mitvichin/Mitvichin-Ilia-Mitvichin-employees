import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';
import { validateFile } from '../../middlewares/validateFile.js';

describe('validateFile middleware', () => {
  it('calls next() when the file is valid', () => {
    const schema = z.object({ originalname: z.string() });
    const req: any = { file: { originalname: 'test.csv' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    const middleware = validateFile(schema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('returns 400 when the file is invalid', () => {
    const schema = z.object({ originalname: z.string() });
    const req: any = { file: { wrongProp: 'test.csv' } };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    const middleware = validateFile(schema);
    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    });
  });

  it('handles empty file gracefully', () => {
    const schema = z.object({ originalname: z.string() });
    const req: any = { file: undefined };
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();

    const middleware = validateFile(schema);
    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    });
  });
});
