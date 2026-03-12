import prisma from '@/lib/prisma';

const FeedbackRepository = {
  async getAllFeedback() {
    return prisma.feedback.findMany();
  },
};

export default FeedbackRepository;
