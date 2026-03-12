import FeedbackRepository from '@/repositories/feedback.repo';

const FeedbackService = {
  async getAllFeedback() {
    const allFeedbacks = await FeedbackRepository.getAllFeedback();
    return allFeedbacks;
  },

  async getFeedbackByUserId(userId: string) {
    const feedbacks = await FeedbackRepository.getFeedbackByUserId(userId);
    return feedbacks;
  },

  async getFeedbackDetail(userId: string, feedbackId: string) {
    const feedbackDetail = await FeedbackRepository.getFeedbackDetail(
      userId,
      feedbackId,
    );
    return feedbackDetail;
  },
};

export default FeedbackService;
