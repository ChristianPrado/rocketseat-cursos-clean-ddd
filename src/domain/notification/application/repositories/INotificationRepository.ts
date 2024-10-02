import { Notification } from "../../enterprise/entities/Notification";

export interface INotificationRepository {
  findById(id: string): Promise<Notification | null>;
  create(notification: Notification): Promise<void>;
  save(notification: Notification): Promise<void>;
}
