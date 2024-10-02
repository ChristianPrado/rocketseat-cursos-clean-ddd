import { Either, left, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { QuestionComment } from "../../enterprise/entities/QuestionComment";
import { IQuestionCommentsRepository } from "../repositories/IQuestionCommentsRepository";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface ICommentOnQuestionUseCaseIn {
  authorId: string;
  questionId: string;
  content: string;
}

type ICommentOnQuestionUseCaseOut = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: ICommentOnQuestionUseCaseIn): Promise<ICommentOnQuestionUseCaseOut> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment);

    return right({ questionComment });
  }
}
