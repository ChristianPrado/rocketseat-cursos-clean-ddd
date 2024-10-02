import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Optional } from "@/core/types/options";
import { Comment, ICommentProps } from "./Comment";

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<IQuestionCommentProps> {
  static create(
    props: Optional<IQuestionCommentProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    return new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get questionId() {
    return this.props.questionId;
  }
}
