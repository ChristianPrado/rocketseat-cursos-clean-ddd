import { Either, left, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { Question } from "../../enterprise/entities/Question";
import { QuestionAttachment } from "../../enterprise/entities/QuestionAttachment";
import { QuestionAttachmentList } from "../../enterprise/entities/QuestionAttachmentList";
import { IQuestionAttachmentRepository } from "../repositories/IQuestionAttachmentsRepository";
import { IQuestionRepository } from "../repositories/IQuestionRepository";

interface IEditQuestionUseCaseIn {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type IEditQuestionUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

export class EditQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionAttachmentRepository: IQuestionAttachmentRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
    attachmentsIds,
  }: IEditQuestionUseCaseIn): Promise<IEditQuestionUseCaseOut> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toValue()) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    );

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityID(attachmentId),
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.attachments = questionAttachmentList;
    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
