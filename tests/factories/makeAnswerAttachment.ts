import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  AnswerAttachment,
  IAnswerAttachmentProps,
} from "@/domain/forum/enterprise/entities/AnswerAttachment";

export function makeAnswerAttachment(
  override: Partial<IAnswerAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  return AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  );
}
