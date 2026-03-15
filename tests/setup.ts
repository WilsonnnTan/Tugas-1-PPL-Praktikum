import 'dotenv/config';
import { vi } from 'vitest';

// Mock headers globally for Next.js API tests
vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Headers()),
}));
