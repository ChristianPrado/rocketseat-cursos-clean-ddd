import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { IDomainEvent } from "@/core/events/IDomainEvent";
import { Question } from "../Question";

export class QuestionBestAnswerChosenEvent implements IDomainEvent {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityID;

  constructor(question: Question, bestAnswerId: UniqueEntityID) {
    this.question = question;
    this.bestAnswerId = bestAnswerId;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.question.id;
  }
}
