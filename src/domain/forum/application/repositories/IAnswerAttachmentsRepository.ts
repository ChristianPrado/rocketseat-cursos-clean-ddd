import { AnswerAttachment } from "../../enterprise/entities/AnswerAttachment";

export interface IAnswerAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
  deleteManyByAnswerId(answerId: string): Promise<void>;
}
