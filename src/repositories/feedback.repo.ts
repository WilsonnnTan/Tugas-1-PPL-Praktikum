import prisma from '@/lib/prisma';

const FeedbackRepository = {
  async getAllFeedback() {
    return prisma.feedback.findMany();
  },

  async getFeedbackByUserId(userId: string) {
    return prisma.feedback.findMany({
      where: {
        userId: userId,
      },
    });
  },
};

export default FeedbackRepository;
