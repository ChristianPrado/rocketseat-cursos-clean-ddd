import { Either, left, right } from "@/core/Either";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { IAnswerRepository } from "../repositories/IAnswerRepository";

interface IDeleteAnswerUseCaseIn {
  answerId: string;
  authorId: string;
}

type IDeleteAnswerUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseIn): Promise<IDeleteAnswerUseCaseOut> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toValue()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(answer);

    return right({});
  }
}
