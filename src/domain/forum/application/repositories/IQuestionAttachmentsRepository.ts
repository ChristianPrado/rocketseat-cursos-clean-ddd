import { QuestionAttachment } from "../../enterprise/entities/QuestionAttachment";

export interface IQuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
