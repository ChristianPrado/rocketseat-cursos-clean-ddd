import { Either, left, right } from "@/core/Either";
import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { ResourceNotFoundError } from "@/core/errors/ResourceNotFoundError";
import { Notification } from "../../enterprise/entities/Notification";
import { INotificationRepository } from "../repositories/INotificationRepository";

interface IReadNotificationUseCaseIn {
  recipientId: string;
  notificationId: string;
}

type IReadNotificationUseCaseOut = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;

export class ReadNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: IReadNotificationUseCaseIn): Promise<IReadNotificationUseCaseOut> {
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationRepository.save(notification);

    return right({ notification });
  }
}
