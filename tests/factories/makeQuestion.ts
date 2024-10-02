import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  IQuestionProps,
  Question,
} from "@/domain/forum/enterprise/entities/Question";

export function makeQuestion(
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityID,
) {
  return Question.create(
    {
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );
}
