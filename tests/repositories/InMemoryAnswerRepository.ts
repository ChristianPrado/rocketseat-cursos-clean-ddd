import { DomainEvents } from "@/core/events/DomainEvents";
import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { IAnswerAttachmentRepository } from "@/domain/forum/application/repositories/IAnswerAttachmentsRepository";
import { IAnswerRepository } from "@/domain/forum/application/repositories/IAnswerRepository";
import { Answer } from "@/domain/forum/enterprise/entities/Answer";

export class InMemoryAnswerRepository implements IAnswerRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentRepository: IAnswerAttachmentRepository,
  ) {}

  async create(answer: Answer) {
    this.items.push(answer);

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async delete(answer: Answer) {
    this.items = this.items.filter((item) => item.id !== answer.id);

    this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toValue() === id) || null;
  }

  async findManyByQuestionId(questionId: string, { page }: IPaginationParams) {
    return this.items
      .filter((item) => item.questionId.toValue() === questionId)
      .slice((page - 1) * 20, page * 20);
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items[itemIndex] = answer;

    DomainEvents.dispatchEventsForAggregate(answer.id);
  }
}
