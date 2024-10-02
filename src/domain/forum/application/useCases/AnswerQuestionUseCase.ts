import { Either, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Answer } from "../../enterprise/entities/Answer";
import { AnswerAttachment } from "../../enterprise/entities/AnswerAttachment";
import { AnswerAttachmentList } from "../../enterprise/entities/AnswerAttachmentList";
import { IAnswerRepository } from "../repositories/IAnswerRepository";

interface IAnswerQuestionUseCaseIn {
  instructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

type IAnswerQuestionUseCaseOut = Either<
  null,
  {
    answer: Answer;
  }
>;

export class AnswerQuestionUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: IAnswerQuestionUseCaseIn): Promise<IAnswerQuestionUseCaseOut> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answerRepository.create(answer);

    return right({ answer });
  }
}
