import { SpyInstance, vi } from "vitest";

import { makeAnswer } from "tests/factories/makeAnswer";
import { makeQuestion } from "tests/factories/makeQuestion";
import { InMemoryAnswerAttachmentRepository } from "tests/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerRepository } from "tests/repositories/InMemoryAnswerRepository";
import { InMemoryNotificationRepository } from "tests/repositories/InMemoryNotificationRepository";
import { InMemoryQuestionAttachmentRepository } from "tests/repositories/InMemoryQuestionAttachmentsRepository";
import { InMemoryQuestionRepository } from "tests/repositories/InMemoryQuestionRepository";
import { waitFor } from "tests/utils/waitFor";

import {
  ISendNotificationUseCaseIn,
  ISendNotificationUseCaseOut,
  SendNotificationUseCase,
} from "../useCases/SendNotificationUseCase";
import { OnAnswerCreated } from "./OnAnswerCreated";

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: SpyInstance<
  [ISendNotificationUseCaseIn],
  Promise<ISendNotificationUseCaseOut>
>;

describe("On answer created", () => {
  beforeAll(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    );
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute");

    new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationUseCase);
  });

  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toBeCalled();
    });
  });
});
