import { Either, left, right } from "@/core/Either";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface IDeleteQuestionUseCaseIn {
  questionId: string;
  authorId: string;
}

type IDeleteQuestionUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseIn): Promise<IDeleteQuestionUseCaseOut> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toValue()) {
      return left(new NotAllowedError());
    }

    await this.questionRepository.delete(question);

    return right({});
  }
}
