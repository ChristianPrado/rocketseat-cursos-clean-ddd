import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  IQuestionAttachmentProps,
  QuestionAttachment,
} from "@/domain/forum/enterprise/entities/QuestionAttachment";

export function makeQuestionAttachment(
  override: Partial<IQuestionAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  return QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  );
}
