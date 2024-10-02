import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeAnswer } from "tests/factories/makeAnswer";
import { InMemoryAnswerAttachmentRepository } from "tests/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerRepository } from "tests/repositories/InMemoryAnswerRepository";
import { FetchQuestionAnswersUseCase } from "./FetchQuestionAnswersUseCase";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch question answers", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }),
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }),
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      }),
    );

    const result = await sut.execute({
      page: 1,
      questionId: "question-1",
    });

    expect(result.value?.answers).toHaveLength(3);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-1"),
        }),
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});
