import { Either, right } from "@/core/Either";
import { Answer } from "../../enterprise/entities/Answer";
import { IAnswerRepository } from "../repositories/IAnswerRepository";

interface IFetchQuestionAnswersUseCaseIn {
  page: number;
  questionId: string;
}

type IFetchQuestionAnswersUseCaseOut = Either<
  null,
  {
    answers: Answer[];
  }
>;

export class FetchQuestionAnswersUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    page,
    questionId,
  }: IFetchQuestionAnswersUseCaseIn): Promise<IFetchQuestionAnswersUseCaseOut> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return right({ answers });
  }
}
