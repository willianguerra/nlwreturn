import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => { } },
  { sendMail: async () => { } },
)

describe('Submit feedback', () => {

  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "Example",
      screenshot: "data:image/png;base64"
    })).resolves.not.toThrow();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "Example",
      screenshot: "data:image/png;base64"
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64"
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without screenshot', async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "Example",
      screenshot: "123data:image/png;base64"
    })).rejects.toThrow();
  });

})