import { Entity } from "@/core/entities/Entity";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";

export interface IAnswerAttachmentProps {
  answerId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<IAnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IAnswerAttachmentProps, id?: UniqueEntityID) {
    return new AnswerAttachment(props, id);
  }
}
