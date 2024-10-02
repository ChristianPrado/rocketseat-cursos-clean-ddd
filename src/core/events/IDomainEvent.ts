import { UniqueEntityID } from "../entities/UniqueEntityID";

export interface IDomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
