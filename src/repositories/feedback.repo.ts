import prisma from '@/lib/prisma';

const FeedbackRepository = {
  async getAllFeedback() {
    return prisma.feedback.findMany({
      select: {
        user: {
          select: { name: true },
        },
        id: true,
        title: true,
        category: true,
      },
    });
  },

  async getFeedbackByUserId(userId: string) {
    return prisma.feedback.findMany({
      where: {
        userId: userId,
      },
      select: {
        user: {
          select: { name: true },
        },
        id: true,
        title: true,
        category: true,
      },
    });
  },

  async getFeedbackDetail(userId: string, feedbackId: string) {
    return prisma.feedback.findFirst({
      where: {
        userId: userId,
        id: feedbackId,
      },
      select: {
        user: {
          select: { name: true },
        },
        title: true,
        category: true,
        content: true,
      },
    });
  },
};

export default FeedbackRepository;
