import { INotificationRepository } from "@/domain/notification/application/repositories/INotificationRepository";
import { Notification } from "@/domain/notification/enterprise/entities/Notification";

export class InMemoryNotificationRepository implements INotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async findById(id: string) {
    return this.items.find((item) => item.id.toValue() === id) || null;
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    );

    this.items[itemIndex] = notification;
  }
}
