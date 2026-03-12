import { requireUser } from '@/lib/auth/auth-api-helper';
import { UnauthorizedError } from '@/lib/auth/auth-api-helper';
import FeedbackService from '@/services/feedback.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/feedback/[id]'>,
) {
  const { id } = await ctx.params;
  try {
    const userId = await requireUser();
    const feedbackDetail = await FeedbackService.getFeedbackDetail(userId, id);

    if (!feedbackDetail) {
      return NextResponse.json(
        {
          status: 'fail',
          data: {
            feedbacks: feedbackDetail,
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        data: {
          feedbacks: feedbackDetail,
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
