import { IAnswerAttachmentRepository } from "@/domain/forum/application/repositories/IAnswerAttachmentsRepository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/AnswerAttachment";

export class InMemoryAnswerAttachmentRepository
  implements IAnswerAttachmentRepository
{
  public items: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string) {
    return this.items.filter((item) => item.answerId.toValue() === answerId);
  }

  async deleteManyByAnswerId(answerId: string) {
    this.items = this.items.filter(
      (item) => item.answerId.toValue() !== answerId,
    );
  }
}
