import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { IDomainEvent } from "@/core/events/IDomainEvent";
import { Answer } from "../Answer";

export class AnswerCreatedEvent implements IDomainEvent {
  public ocurredAt: Date;
  public answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id;
  }
}
