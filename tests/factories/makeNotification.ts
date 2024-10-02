import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import {
  INotificationProps,
  Notification,
} from "@/domain/notification/enterprise/entities/Notification";

export function makeNotification(
  override: Partial<INotificationProps> = {},
  id?: UniqueEntityID,
) {
  return Notification.create(
    {
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      recipientId: new UniqueEntityID(),
      ...override,
    },
    id,
  );
}
