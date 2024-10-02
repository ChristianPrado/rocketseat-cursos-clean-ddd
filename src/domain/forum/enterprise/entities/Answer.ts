import { AggregateRoot } from "@/core/entities/AggregateRoot";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Optional } from "@/core/types/options";
import { AnswerAttachmentList } from "./AnswerAttachmentList";
import { AnswerCreatedEvent } from "./events/AnswerCreatedEvent";

export interface IAnswerProps {
  content: string;
  questionId: UniqueEntityID;
  authorId: UniqueEntityID;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends AggregateRoot<IAnswerProps> {
  static create(
    props: Optional<IAnswerProps, "createdAt" | "attachments">,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    );

    const isNewAnswer = !id;

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer));
    }

    return answer;
  }

  get content() {
    return this.props.content;
  }

  get questionId() {
    return this.props.questionId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get attachments() {
    return this.props.attachments;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd() + "...";
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
