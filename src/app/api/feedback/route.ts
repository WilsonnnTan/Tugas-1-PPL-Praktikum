import { requireUser } from '@/lib/auth/auth-api-helper';
import { UnauthorizedError } from '@/lib/auth/auth-api-helper';
import { FeedbackSchema } from '@/schemas/feedback.schema';
import FeedbackService from '@/services/feedback.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const allFeedbacks = await FeedbackService.getAllFeedback();
    return NextResponse.json(
      {
        status: 'success',
        data: {
          feedbacks: allFeedbacks,
        },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}

// Create Feedback
export async function POST(req: NextRequest) {
  try {
    const userId = await requireUser();
    const body = await req.json();

    const result = await FeedbackSchema.safeParseAsync(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { status: 'fail', data: errors },
        { status: 400 },
      );
    }

    const createdFeedback = await FeedbackService.createFeedback(
      userId,
      result.data,
    );

    return NextResponse.json(
      {
        status: 'success',
        data: {
          feedback: createdFeedback,
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
