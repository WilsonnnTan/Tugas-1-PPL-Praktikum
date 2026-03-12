import FeedbackRepository from '@/repositories/feedback.repo';

const FeedbackService = {
  async getAllFeedback() {
    const AllFeedback = await FeedbackRepository.getAllFeedback();
    return AllFeedback;
  },
};

export default FeedbackService;
