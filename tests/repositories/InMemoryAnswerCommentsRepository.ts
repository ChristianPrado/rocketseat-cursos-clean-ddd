import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { IAnswerCommentsRepository } from "@/domain/forum/application/repositories/IAnswerCommentsRepository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/AnswerComment";

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.toValue() === id) || null;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    this.items = this.items.filter(
      (item) => item.id.toValue() !== answerComment.id.toValue(),
    );
  }

  async findManyByAnswerId(answerId: string, { page }: IPaginationParams) {
    return this.items
      .filter((item) => item.answerId.toValue() === answerId)
      .slice((page - 1) * 20, page * 20);
  }
}
