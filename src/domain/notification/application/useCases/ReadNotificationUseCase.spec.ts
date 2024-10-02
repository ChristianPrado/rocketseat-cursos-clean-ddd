import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { NotAllowedError } from "@/core/errors/NotAllowedError";
import { makeNotification } from "tests/factories/makeNotification";
import { InMemoryNotificationRepository } from "tests/repositories/InMemoryNotificationRepository";
import { ReadNotificationUseCase } from "./ReadNotificationUseCase";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe("Read notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to read a notification from another user", async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID("1"),
    });

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: "2",
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
