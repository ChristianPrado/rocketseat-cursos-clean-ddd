import { DomainEvents } from "../events/DomainEvents";
import { IDomainEvent } from "../events/IDomainEvent";
import { Entity } from "./Entity";

export class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: IDomainEvent[] = [];

  get domainEvents() {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
