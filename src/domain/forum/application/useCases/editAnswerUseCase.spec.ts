import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeAnswer } from "tests/factories/makeAnswer";
import { InMemoryAnswerAttachmentRepository } from "tests/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerRepository } from "tests/repositories/InMemoryAnswerRepository";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { EditAnswerUseCase } from "./EditAnswerUseCase";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: EditAnswerUseCase;

describe("Edit answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new EditAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerAttachmentRepository,
    );
  });

  it("should be able to edit a answer by id", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1",
      content: "new content",
      attachmentsIds: ["1", "2"],
    });

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: "new content",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1"),
      },
      new UniqueEntityID("answer-1"),
    );

    await inMemoryAnswerRepository.create(newAnswer);

    const result = await sut.execute({
      answerId: "answer-1",
      authorId: "author-2",
      content: "new content",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
