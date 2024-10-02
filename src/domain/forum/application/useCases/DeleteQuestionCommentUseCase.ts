import { Either, left, right } from "@/core/Either";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { IQuestionCommentsRepository } from "../repositories/IQuestionCommentsRepository";

interface IDeleteQuestionCommentUseCaseIn {
  authorId: string;
  questionCommentId: string;
}

type IDeleteQuestionCommentUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseIn): Promise<IDeleteQuestionCommentUseCaseOut> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return left(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toValue() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
