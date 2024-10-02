import { Either, right } from "@/core/Either";
import { Question } from "../../enterprise/entities/Question";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface IFetchRecentQuestionsUseCaseIn {
  page: number;
}

type IFetchRecentQuestionsUseCaseOut = Either<
  null,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    page,
  }: IFetchRecentQuestionsUseCaseIn): Promise<IFetchRecentQuestionsUseCaseOut> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({ questions });
  }
}
