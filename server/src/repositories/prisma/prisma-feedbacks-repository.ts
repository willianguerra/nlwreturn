import { prisma } from "../../prisma";
import { FeedBacksRepository, FeedbackCreateData } from "../feedbacks-repository";

export class PrismaFeedBacksRepository implements FeedBacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedBack.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}