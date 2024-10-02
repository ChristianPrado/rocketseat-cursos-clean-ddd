import { Either, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Question } from "../../enterprise/entities/Question";
import { QuestionAttachment } from "../../enterprise/entities/QuestionAttachment";
import { QuestionAttachmentList } from "../../enterprise/entities/QuestionAttachmentList";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface ICreateQuestionUseCaseIn {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type ICreateQuestionUseCaseOut = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: ICreateQuestionUseCaseIn): Promise<ICreateQuestionUseCaseOut> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId),
    });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityID(attachmentId),
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionRepository.create(question);

    return right({ question });
  }
}
