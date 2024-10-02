import { Either, left, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { Answer } from "../../enterprise/entities/Answer";
import { AnswerAttachment } from "../../enterprise/entities/AnswerAttachment";
import { AnswerAttachmentList } from "../../enterprise/entities/AnswerAttachmentList";
import { IAnswerAttachmentRepository } from "../repositories/IAnswerAttachmentsRepository";
import { IAnswerRepository } from "../repositories/IAnswerRepository";

interface IEditAnswerUseCaseIn {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type IEditAnswerUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private answerAttachmentRepository: IAnswerAttachmentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: IEditAnswerUseCaseIn): Promise<IEditAnswerUseCaseOut> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toValue()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    );

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.attachments = answerAttachmentList;
    answer.content = content;

    await this.answerRepository.save(answer);

    return right({ answer });
  }
}
