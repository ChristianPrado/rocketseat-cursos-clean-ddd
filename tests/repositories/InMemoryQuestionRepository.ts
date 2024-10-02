import { DomainEvents } from "@/core/events/DomainEvents";
import { IPaginationParams } from "@/core/repositories/IPaginationParams";
import { IQuestionRepository } from "@/domain/forum/application/repositories/IQuestionRepository";
import { Question } from "@/domain/forum/enterprise/entities/Question";
import { InMemoryQuestionAttachmentRepository } from "./InMemoryQuestionAttachmentsRepository";

export class InMemoryQuestionRepository implements IQuestionRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentRepository: InMemoryQuestionAttachmentRepository,
  ) {}

  async create(question: Question) {
    this.items.push(question);
    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async delete(question: Question) {
    this.items = this.items.filter((item) => item.id !== question.id);
    this.questionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    );
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toValue() === id) || null;
  }

  async findBySlug(slug: string) {
    return this.items.find((item) => item.slug.value === slug) || null;
  }

  async findManyRecent({ page }: IPaginationParams) {
    this.items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return this.items.slice((page - 1) * 20, page * 20);
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);

    this.items[itemIndex] = question;
    DomainEvents.dispatchEventsForAggregate(question.id);
  }
}
