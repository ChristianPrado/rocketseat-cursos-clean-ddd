import dayjs from "dayjs";

import { AggregateRoot } from "@/core/entities/AggregateRoot";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Optional } from "@/core/types/options";
import { QuestionBestAnswerChosenEvent } from "./events/QuestionBestAnswerChosenEvent";
import { QuestionAttachmentList } from "./QuestionAttachmentList";
import { Slug } from "./valueObjects/Slug";

export interface IQuestionProps {
  title: string;
  content: string;
  authorId: UniqueEntityID;
  slug: Slug;
  bestAnswerId?: UniqueEntityID;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<IQuestionProps> {
  static create(
    props: Optional<IQuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityID,
  ) {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get slug() {
    return this.props.slug;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
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

  get isNew() {
    return dayjs().diff(this.props.createdAt, "day") <= 3;
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd() + "...";
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    if (bestAnswerId === undefined) {
      return;
    }

    if (
      this.props.bestAnswerId === undefined ||
      !this.props.bestAnswerId.equals(bestAnswerId)
    ) {
      this.addDomainEvent(
        new QuestionBestAnswerChosenEvent(this, bestAnswerId),
      );
    }

    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
