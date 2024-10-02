import { Entity } from "@/core/entities/Entity";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Optional } from "@/core/types/options";

export interface INotificationProps {
  recipientId: UniqueEntityID;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
}

export class Notification extends Entity<INotificationProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  static create(
    props: Optional<INotificationProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    return new Notification(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );
  }
}
