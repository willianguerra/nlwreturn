export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedBacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}