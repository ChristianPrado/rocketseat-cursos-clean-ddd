import { InMemoryNotificationRepository } from "tests/repositories/InMemoryNotificationRepository";
import { SendNotificationUseCase } from "./SendNotificationUseCase";

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe("Send notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      content: "Conteúdo da notificação",
      recipientId: "1",
      title: "Nova notificação",
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
