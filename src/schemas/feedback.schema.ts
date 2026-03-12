import * as z from 'zod';

const FeedbackCategoryEnum = z.enum([
  'BUG',
  'FEATURE_REQUEST',
  'UX',
  'PERFORMANCE',
  'GENERAL',
]);

export const FeedbackSchema = z.object({
  title: z
    .string('Title is required!')
    .min(5, 'Title must be at least 5 characters')
    .max(500, 'Title must not exceed 500 characters')
    .trim(),

  content: z
    .string('Content is required!')
    .min(5, 'Content must be at least 5 characters')
    .max(5000, 'Content must not exceed 5000 characters')
    .trim(),

  category: FeedbackCategoryEnum.default('GENERAL'),
});

export type FeedbackSchema = z.infer<typeof FeedbackSchema>;
