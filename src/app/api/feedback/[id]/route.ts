import { requireUser } from '@/lib/auth/auth-api-helper';
import { UnauthorizedError } from '@/lib/auth/auth-api-helper';
import { FeedbackSchema } from '@/schemas/feedback.schema';
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

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/feedback/[id]'>,
) {
  const { id } = await ctx.params;

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

    const updatedFeedback = await FeedbackService.updateFeedback(
      userId,
      id,
      result.data,
    );

    return NextResponse.json(
      {
        status: 'success',
        data: {
          feedback: updatedFeedback,
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
