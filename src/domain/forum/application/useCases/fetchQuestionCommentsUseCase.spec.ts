import { UniqueEntityID } from "@/core/entities/UniqueEntityID";
import { makeQuestionComment } from "tests/factories/makeQuestionComment";
import { InMemoryQuestionCommentsRepository } from "tests/repositories/InMemoryQuestionCommentsRepository";
import { FetchQuestionCommentUseCase } from "./FetchQuestionCommentsUseCase";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentUseCase;

describe("Fetch question comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should be able to fetch question comments", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      }),
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID("question-1"),
      }),
    );

    const result = await sut.execute({
      page: 1,
      questionId: "question-1",
    });

    expect(result.value?.questionComments).toHaveLength(3);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID("question-1"),
        }),
      );
    }

    const result = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
