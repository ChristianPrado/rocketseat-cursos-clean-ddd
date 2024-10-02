import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  AnswerComment,
  IAnswerCommentProps,
} from "@/domain/forum/enterprise/entities/AnswerComment";

export function makeAnswerComment(
  override: Partial<IAnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );
}
