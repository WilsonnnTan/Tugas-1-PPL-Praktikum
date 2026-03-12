import FeedbackRepository from '@/repositories/feedback.repo';
import type { FeedbackSchema } from '@/schemas/feedback.schema';

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

  async createFeedback(userId: string, data: FeedbackSchema) {
    const createdFeedback = await FeedbackRepository.createFeedback(
      userId,
      data,
    );
    return createdFeedback;
  },

  async updateFeedback(
    userId: string,
    feedbackId: string,
    data: FeedbackSchema,
  ) {
    const updatedFeedback = await FeedbackRepository.updateFeedback(
      userId,
      feedbackId,
      data,
    );
    return updatedFeedback;
  },

  async deleteFeedback(userId: string, feedbackId: string) {
    await FeedbackRepository.deleteFeedback(userId, feedbackId);
  },
};

export default FeedbackService;
