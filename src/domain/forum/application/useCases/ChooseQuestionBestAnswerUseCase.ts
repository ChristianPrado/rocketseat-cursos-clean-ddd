import { Either, left, right } from "@/core/Either";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { Question } from "../../enterprise/entities/Question";
import { IAnswerRepository } from "../repositories/IAnswerRepository";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface IChooseQuestionBestAnswerUseCaseIn {
  answerId: string;
  authorId: string;
}

type IChooseQuestionBestAnswerUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private questionRepository: IQuestionRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: IChooseQuestionBestAnswerUseCaseIn): Promise<IChooseQuestionBestAnswerUseCaseOut> {
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toValue(),
    );
    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toValue() !== authorId) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
