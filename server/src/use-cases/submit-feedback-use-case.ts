import { MailAdapter } from '../adapters/mail-adapter';
import { FeedBacksRepository } from './../repositories/feedbacks-repository';
interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string,
}

export class SubmitFeedbackUseCase {

  constructor(
    private FeedBacksRepository: FeedBacksRepository,
    private mailAdapter: MailAdapter
  ) { }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Types is required');
    }
    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format');
    }

    await this.FeedBacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo FeedBack', body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do FeedBack: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        `<p>Captura de Tela: ${screenshot}</p>`,
        `</div>`
      ].join('\n')
    }
    )

  }
}