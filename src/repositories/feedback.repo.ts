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
};

export default FeedbackRepository;
