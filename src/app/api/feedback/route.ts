import FeedbackService from '@/services/feedback.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const AllFeedback = await FeedbackService.getAllFeedback();
    return NextResponse.json(
      {
        status: 'success',
        data: {
          feedbacks: AllFeedback,
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
