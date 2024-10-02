import { Either, right } from "@/core/Either";
import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { Notification } from "../../enterprise/entities/Notification";
import { INotificationRepository } from "../repositories/INotificationRepository";

export interface ISendNotificationUseCaseIn {
  recipientId: string;
  title: string;
  content: string;
}

export type ISendNotificationUseCaseOut = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: ISendNotificationUseCaseIn): Promise<ISendNotificationUseCaseOut> {
    const notification = Notification.create({
      title,
      content,
      recipientId: new UniqueEntityID(recipientId),
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
