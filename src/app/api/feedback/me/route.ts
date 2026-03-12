import { requireUser } from '@/lib/auth/auth-api-helper';
import { UnauthorizedError } from '@/lib/auth/auth-api-helper';
import FeedbackService from '@/services/feedback.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userId = await requireUser();
    const feedbacks = await FeedbackService.getFeedbackByUserId(userId);
    return NextResponse.json(
      {
        status: 'success',
        data: {
          feedbacks: feedbacks,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          status: 'error',
          message: err.message,
        },
        { status: err.status },
      );
    }
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
