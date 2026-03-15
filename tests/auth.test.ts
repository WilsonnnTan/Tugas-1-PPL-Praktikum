import { POST } from '@/app/api/auth/[...all]/route';
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';

describe('Authentication API', () => {
  const testEmail = `test-${Math.random().toString(36).substring(7)}@example.com`;
  const testPassword = 'Password123!';
  const testName = 'Test User';

  it('should sign up a new user with email', async () => {
    const req = new NextRequest(
      'http://localhost:3000/api/auth/sign-up/email',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          name: testName,
        }),
      },
    );

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe(testEmail);
    expect(data.token).toBeDefined();
  });

  it('should sign in an existing user with email', async () => {
    const req = new NextRequest(
      'http://localhost:3000/api/auth/sign-in/email',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
        }),
      },
    );

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe(testEmail);
    expect(data.token).toBeDefined();
  });
});
