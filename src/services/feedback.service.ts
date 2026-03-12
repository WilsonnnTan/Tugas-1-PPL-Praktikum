import FeedbackRepository from '@/repositories/feedback.repo';

const FeedbackService = {
  async getAllFeedback() {
    const AllFeedback = await FeedbackRepository.getAllFeedback();
    return AllFeedback;
  },

  async getFeedbackByUserId(userId: string) {
    const Feedbacks = await FeedbackRepository.getFeedbackByUserId(userId);
    return Feedbacks;
  },
};

export default FeedbackService;
