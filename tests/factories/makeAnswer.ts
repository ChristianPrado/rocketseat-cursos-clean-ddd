import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  Answer,
  IAnswerProps,
} from "@/domain/forum/enterprise/entities/Answer";

export function makeAnswer(
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityID,
) {
  return Answer.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );
}
