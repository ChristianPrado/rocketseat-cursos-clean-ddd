import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/IQuestionCommentsRepository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/QuestionComment";

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment);
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toValue() === id) || null;
  }

  async delete(questionComment: QuestionComment) {
    this.items = this.items.filter((item) => item.id !== questionComment.id);
  }

  async findManyByQuestionId(questionId: string, { page }: IPaginationParams) {
    return this.items
      .filter((item) => item.questionId.toValue() === questionId)
      .slice((page - 1) * 20, page * 20);
  }
}
