import { Either, left, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { AnswerComment } from "../../enterprise/entities/AnswerComment";
import { IAnswerCommentsRepository } from "../repositories/IAnswerCommentsRepository";
import { IAnswerRepository } from "../repositories/IAnswerRepository";

interface ICommentOnAnswerUseCaseIn {
  authorId: string;
  answerId: string;
  content: string;
}

type ICommentOnAnswerUseCaseOut = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: ICommentOnAnswerUseCaseIn): Promise<ICommentOnAnswerUseCaseOut> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}
