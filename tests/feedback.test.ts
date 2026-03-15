import { POST as authPOST } from '@/app/api/auth/[...all]/route';
import {
  DELETE as detailDELETE,
  GET as detailGET,
  PATCH as detailPATCH,
} from '@/app/api/feedback/[id]/route';
import { GET as myFeedbackGET } from '@/app/api/feedback/me/route';
import {
  GET as feedbackGET,
  POST as feedbackPOST,
} from '@/app/api/feedback/route';
import { NextRequest } from 'next/server';
import { beforeAll, describe, expect, it } from 'vitest';
import { vi } from 'vitest';

const mockHeaders = new Headers();
vi.mock('next/headers', () => ({
  headers: vi.fn(async () => mockHeaders),
}));

describe('Feedback API CRUD', () => {
  let authToken: string;
  let feedbackId: string;
  const testEmail = `crud-${Math.random().toString(36).substring(7)}@example.com`;
  const testPassword = 'Password123!';

  beforeAll(async () => {
    // Sign up to get token
    const signupReq = new NextRequest(
      'http://localhost:3000/api/auth/sign-up/email',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          name: 'CRUD Tester',
        }),
      },
    );
    const signupRes = await authPOST(signupReq);
    const signupData = await signupRes.json();

    if (!signupData.token) {
      throw new Error(`Signup failed: ${JSON.stringify(signupData)}`);
    }

    authToken = signupData.token;
    mockHeaders.set('Authorization', `Bearer ${authToken}`);
  });

  it('should create a new feedback', async () => {
    const req = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Feedback',
        category: 'GENERAL',
        content: 'This is a test feedback content with at least 10 characters.',
      }),
    });

    const response = await feedbackPOST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
    expect(data.data.feedback).toBeDefined();
    feedbackId = data.data.feedback.id;
  });

  it('should get all feedbacks', async () => {
    const response = await feedbackGET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
    expect(Array.isArray(data.data.feedbacks)).toBe(true);
  });

  it('should get my feedbacks', async () => {
    const response = await myFeedbackGET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
    expect(Array.isArray(data.data.feedbacks)).toBe(true);
  });

  it('should get feedback detail', async () => {
    const req = new NextRequest(
      `http://localhost:3000/api/feedback/${feedbackId}`,
    );
    const response = await detailGET(req, {
      params: Promise.resolve({ id: feedbackId }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
    expect(data.data.feedbacks).toBeDefined();
  });

  it('should update feedback', async () => {
    const req = new NextRequest(
      `http://localhost:3000/api/feedback/${feedbackId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Updated Test Feedback',
        }),
      },
    );

    const response = await detailPATCH(req, {
      params: Promise.resolve({ id: feedbackId }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
    expect(data.data.feedback.title).toBe('Updated Test Feedback');
  });

  it('should delete feedback', async () => {
    const req = new NextRequest(
      `http://localhost:3000/api/feedback/${feedbackId}`,
      {
        method: 'DELETE',
      },
    );

    const response = await detailDELETE(req, {
      params: Promise.resolve({ id: feedbackId }),
    });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
  });
});
