import { AggregateRoot } from "../entities/AggregateRoot";
import { UniqueEntityID } from "../entities/UniqueEntityID";
import { DomainEvents } from "./DomainEvents";
import { IDomainEvent } from "./IDomainEvent";

class CustomAggregateCreated implements IDomainEvent {
  public ocurredAt: Date;

  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("Domain events", () => {
  it("should be able to dispatch and listen to events", () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents.length).toBe(1);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).toBeCalled();
    expect(aggregate.domainEvents.length).toBe(0);
  });
});
