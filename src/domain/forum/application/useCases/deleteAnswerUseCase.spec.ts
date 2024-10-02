import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeAnswer } from "tests/factories/makeAnswer";
import { InMemoryAnswerAttachmentRepository } from "tests/repositories/InMemoryAnswerAttachmentsRepository";
import { InMemoryAnswerRepository } from "tests/repositories/InMemoryAnswerRepository";
import { NotAllowedError } from "../../../../core/errors/NotAllowedError";
import { DeleteAnswerUseCase } from "./DeleteAnswerUseCase";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: DeleteAnswerUseCase;

describe("Delete answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  it("should be able to delete a answer by id", async () => {
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
    });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer from another user", async () => {
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
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
