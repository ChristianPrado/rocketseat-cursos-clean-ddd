import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  IQuestionCommentProps,
  QuestionComment,
} from "@/domain/forum/enterprise/entities/QuestionComment";

export function makeQuestionComment(
  override: Partial<IQuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  return QuestionComment.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );
}
