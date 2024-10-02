import { IQuestionAttachmentRepository } from "@/domain/forum/application/repositories/IQuestionAttachmentsRepository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/QuestionAttachment";

export class InMemoryQuestionAttachmentRepository
  implements IQuestionAttachmentRepository
{
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    return this.items.filter(
      (item) => item.questionId.toValue() === questionId,
    );
  }

  async deleteManyByQuestionId(questionId: string) {
    this.items = this.items.filter(
      (item) => item.questionId.toValue() !== questionId,
    );
  }
}
