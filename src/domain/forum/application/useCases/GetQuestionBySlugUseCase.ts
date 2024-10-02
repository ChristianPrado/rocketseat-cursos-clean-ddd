import { Either, left, right } from "@/core/Either";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { Question } from "../../enterprise/entities/Question";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface IGetQuestionBySlugUseCaseIn {
  slug: string;
}

type IGetQuestionBySlugUseCaseOut = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseIn): Promise<IGetQuestionBySlugUseCaseOut> {
    const question = await this.questionRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({ question });
  }
}
