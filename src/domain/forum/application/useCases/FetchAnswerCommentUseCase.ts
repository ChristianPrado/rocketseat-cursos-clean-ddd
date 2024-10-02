import { Either, right } from "@/core/Either";
import { AnswerComment } from "../../enterprise/entities/AnswerComment";
import { IAnswerCommentsRepository } from "../repositories/IAnswerCommentsRepository";

interface IFetchAnswerCommentUseCaseIn {
  page: number;
  answerId: string;
}

type IFetchAnswerCommentUseCaseOut = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswerCommentUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: IFetchAnswerCommentUseCaseIn): Promise<IFetchAnswerCommentUseCaseOut> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return right({ answerComments });
  }
}
