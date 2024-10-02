import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeAnswerComment } from "tests/factories/makeAnswerComment";
import { InMemoryAnswerCommentsRepository } from "tests/repositories/InMemoryAnswerCommentsRepository";
import { FetchAnswerCommentUseCase } from "./FetchAnswerCommentUseCase";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentUseCase;

describe("Fetch answer comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to fetch answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      }),
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID("answer-1"),
      }),
    );

    const result = await sut.execute({
      page: 1,
      answerId: "answer-1",
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  it("should be able to fetch paginated answer answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID("answer-1"),
        }),
      );
    }

    const result = await sut.execute({
      page: 2,
      answerId: "answer-1",
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
