import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Optional } from "@/core/types/options";
import { Comment, ICommentProps } from "./Comment";

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  static create(
    props: Optional<IAnswerCommentProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    return new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get answerId() {
    return this.props.answerId;
  }
}
