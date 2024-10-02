import { Either, right } from "@/core/Either";
import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { IQuestionCommentsRepository } from "../repositories/IQuestionCommentsRepository";

interface IFetchQuestionCommentUseCaseIn {
  page: number;
  questionId: string;
}

type IFetchQuestionCommentUseCaseOut = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;

export class FetchQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionCommentUseCaseIn): Promise<IFetchQuestionCommentUseCaseOut> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return right({ questionComments });
  }
}
