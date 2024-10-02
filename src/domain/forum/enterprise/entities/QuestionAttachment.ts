import { Entity } from "@/core/entities/Entity";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";

export interface IQuestionAttachmentProps {
  questionId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class QuestionAttachment extends Entity<IQuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IQuestionAttachmentProps, id?: UniqueEntityID) {
    return new QuestionAttachment(props, id);
  }
}
